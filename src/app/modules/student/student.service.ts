import AppError from "../../errors/AppError";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import { Types } from "mongoose";
import httpStatus from "http-status";

const getAllStudentsFromDB = async () => {
  const result = await Student.find({})

    .populate("academicDepartment");
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findById({ _id: id });
  const objectId = new Types.ObjectId(id);
  const result = await Student.aggregate([{ $match: { _id: objectId } }]);
  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const options = { isDeleted: true };
  const result = await Student.updateOne({ _id: id }, options);
  return result;
};

// update student details by id
const updateStudentFromDb = async (
  id: string,
  updatedData: Partial<TStudent>
) => {
  const existingStudent = await Student.findOne({ _id: id });
  if (!existingStudent) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  if (updatedData?.email || updatedData?.contactNo) {
    const duplicate = await Student.findOne({
      _id: { $ne: id },
      $or: [{ email: updatedData.email }, { contactNo: updatedData.contactNo }],
    });
    if (duplicate) {
      throw new Error(
        "Student already exists with this email or contact number"
      );
    }
    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    return updatedStudent;
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDb,
  updateStudentFromDb,
};
