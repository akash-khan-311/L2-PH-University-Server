import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";
import { generateStudentId } from "./user.utils";

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
    throw new Error("Admission semester not found");
  }

  // Generate id
  user.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(user);

  // set id and _id as user
  payload.id = newUser.id;
  payload.user = newUser._id;

  const newStudent = await Student.create(payload);
  return newStudent;
};

export const UserServices = {
  createUserIntoDB,
};
