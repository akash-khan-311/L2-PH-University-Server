import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";

const createStudentIntoDB = async (password: string, student: TStudent) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.default_password as string);

  //   set role
  user.role = "student";

  //   manually generate id
  user.id = "10302100004";
  const newUser = await User.create(user);

  if (Object.keys(newUser).length) {
    // set id and _id as user
    student.id = newUser.id;
    student.user = newUser._id;
    const newStudent = await Student.create(student);

    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
