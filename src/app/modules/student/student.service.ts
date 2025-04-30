import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // Built in static method to create a new document in the collection

  // const result = await StudentModel.create(student);

  const student = new Student(studentData);
  const result = await student.save();
  const { email, contactNo } = studentData;
  const studentExists = await student.isExists(email, contactNo);
  if (studentExists) {
    throw new Error("Student already exists with this email or contact number");
  }
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
