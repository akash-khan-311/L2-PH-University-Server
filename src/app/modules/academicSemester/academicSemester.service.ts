import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createSemesterIntoDB = async (semester: TAcademicSemester) => {
  const result = await AcademicSemester.create(semester);
  return result;
};

export const AcademicSemesterService = {
  createSemesterIntoDB,
};
