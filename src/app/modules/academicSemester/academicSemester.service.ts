import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TAcademicSemesterCodeMaper = {
    [key: string]: string;
  };

  const academicSemesterCodeMapper: TAcademicSemesterCodeMaper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };

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
    throw new Error("Semester not found");
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
