import AppError from "../../errors/AppError";
import { academicSemesterCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import httpStatus from "http-status";
const createSemesterIntoDB = async (payload: TAcademicSemester) => {
  const isMapped = academicSemesterCodeMapper[payload.name] !== payload.code;

  if (isMapped) {
    throw new Error("Invalid Semester");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

// Get all semesters
const getAllSemesterFromDb = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });
  return result;
};

const updateSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  const isExists = await AcademicSemester.findOne({ _id: id });
  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester not found");
  }
  const result = await AcademicSemester.updateOne({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AcademicSemesterService = {
  createSemesterIntoDB,
  getAllSemesterFromDb,
  getSingleSemesterFromDB,
  updateSemesterIntoDB,
};
