import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find({});
  return result;
};

const singleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id });
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const isExists = await AcademicDepartment.findOne({ _id: id });
  if (!isExists) {
    throw new Error("Semester not found");
  }
  const result = await AcademicDepartment.updateOne({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  singleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
