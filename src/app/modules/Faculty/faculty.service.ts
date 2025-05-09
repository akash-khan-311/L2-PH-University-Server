import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import flattenObject from "../../utils/flattenObject";
import { facultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import httpStatus from "http-status";
import User from "../user/user.model";

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate("academicDepartment"),
    query
  )
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById({ _id: id }).populate(
    "academicDepartment"
  );
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const existingFaculty = await Faculty.findOne({ _id: id.trim() });
  if (!existingFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found 🙂");
  }

  if (payload?.email || payload?.contactNo) {
    const duplicate = await Faculty.findOne({
      _id: { $ne: id },
      $or: [
        ...(payload.email ? [{ email: payload.email }] : []),
        ...(payload.contactNo ? [{ contactNo: payload.contactNo }] : []),
      ],
    });
    if (duplicate) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Student already exists with this email or contact number"
      );
    }
  }

  const flatPayload = flattenObject(payload);
  const updatedStudent = await Faculty.findByIdAndUpdate(
    { _id: id },
    flatPayload,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedStudent;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteFaculty = await Faculty.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty not found");
    }
    const userId = deleteFaculty.user;
    const deletedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User not found");
    }
    await session.commitTransaction();
    await session.endSession();

    return deleteFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const FacultyService = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
