/* eslint-disable no-unused-vars */
import AppError from "../../errors/AppError";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import mongoose, { Types } from "mongoose";
import httpStatus from "http-status";
import User from "../user/user.model";
import flattenObject from "../../utils/flattenObject";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });

  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const options = { isDeleted: true };
    const deletedStudent = await Student.findOneAndUpdate({ id }, options, {
      new: true,
      session,
    });
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Student not found");
    }

    const deletedUser = await User.findOneAndUpdate({ id }, options, {
      new: true,
      session,
    });

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User not found");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
  }
};

// update student details by id
const updateStudentFromDb = async (id: string, payload: Partial<TStudent>) => {
  const existingStudent = await Student.findOne({ id: id.trim() });
  if (!existingStudent) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found 🙂");
  }

  if (payload?.email || payload?.contactNo) {
    const duplicate = await Student.findOne({
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

  const flatPayload = flattenObject(payload); // flatten nested fields
  const updatedStudent = await Student.findOneAndUpdate({ id }, flatPayload, {
    new: true,
    runValidators: true,
  });

  return updatedStudent;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDb,
  updateStudentFromDb,
};
