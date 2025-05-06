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

export const AcademicSemesterService = {
  createSemesterIntoDB,
};
