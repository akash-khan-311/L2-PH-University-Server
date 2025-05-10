import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

const loginUserIntoDB = async (payload: TLoginUser) => {
  // Checking if the user exists or not
  const isUserExists = await User.findOne({ id: payload.id });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found 😂");
  }
  // Check if the user deleted or not
  if (isUserExists.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User deleted");
  }

  // Check if the user blocked or not
  if (isUserExists.status === "blocked") {
    throw new AppError(httpStatus.BAD_REQUEST, "User blocked");
  }
  // Checking if the password is correct or not
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    isUserExists.password
  );

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  console.log(isPasswordCorrect);

  // Access Granted: Send Access Token
};

export const AuthService = {
  loginUserIntoDB,
};
