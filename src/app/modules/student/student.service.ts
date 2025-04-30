import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // Built in static method to create a new document in the collection

  // const result = await StudentModel.create(student);
  const { email, contactNo } = studentData;
  const student = new Student(studentData);
  const studentExists = await student.isExists(email, contactNo);
  if (studentExists) {
    throw new Error("Student already exists with this email or contact number");
  }

  const result = await student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findById({ _id: id });
  const result = await Student.aggregate([{ $match: { _id: id } }]);
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
  updatedData: Partial<TStudent>,
) => {
  const existingStudent = await Student.findOne({ _id: id });
  if (!existingStudent) {
    throw new Error("Student not found");
  }

  if (updatedData?.email || updatedData?.contactNo) {
    const duplicate = await Student.findOne({
      _id: { $ne: id },
      $or: [{ email: updatedData.email }, { contactNo: updatedData.contactNo }],
    });
    if (duplicate) {
      throw new Error(
        "Student already exists with this email or contact number",
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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDb,
  updateStudentFromDb,
};
