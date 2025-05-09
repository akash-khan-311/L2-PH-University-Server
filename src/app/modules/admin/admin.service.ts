import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AdminSearchableFields } from "./admin.constant";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import httpStatus from "http-status";

import flattenObject from "../../utils/flattenObject";
import User from "../user/user.model";
import mongoose from "mongoose";

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({ id });
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const existingAdmin = await Admin.findOne({ _id: id.trim() });
  if (!existingAdmin) {
    throw new AppError(httpStatus.NOT_FOUND, "Admin not found 🙂");
  }

  if (payload?.email || payload?.contactNo) {
    const duplicate = await Admin.findOne({
      _id: { $ne: id },
      $or: [
        ...(payload.email ? [{ email: payload.email }] : []),
        ...(payload.contactNo ? [{ contactNo: payload.contactNo }] : []),
      ],
    });
    if (duplicate) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Admin already exists with this email or contact number"
      );
    }
  }

  const flatPayload = flattenObject(payload);
  const updatedStudent = await Admin.findByIdAndUpdate(
    { _id: id },
    flatPayload,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedStudent;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete admin");
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;

    const deletedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const AdminService = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
