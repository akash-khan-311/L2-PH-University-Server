/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { Faculty } from "../Faculty/faculty.model";

const createUserIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.default_password as string);

  //   set role
  user.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Generate id
    user.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // set id and _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student😕");
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  //   set role
  userData.role = "faculty";

  const academicDepartment = await AcademicSemester.findById(
    payload.academicDepartment
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic department not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.id = userData.id;
    payload.user = newUser[0]._id;
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty😕");
  }
};

// const createAdminIntoDB = async (password: string, payload: TFaculty) => {
//   const userData: Partial<TUser> = {};
//   userData.password = password || (config.default_password as string);

//   //   set role
//   userData.role = "admin";

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     userData.id = await generateAdminId();
//     const newUser = await User.create([userData], { session });

//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
//     }

//     payload.id = userData.id;
//     payload.user = newUser[0]._id;
//     const newAdmin = await User.create([payload], { session });
//     if (!newAdmin.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
//     }
//     await session.commitTransaction();
//     await session.endSession();
//     return newAdmin;
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin😕");
//   }
// };

export const UserServices = {
  createUserIntoDB,
};
