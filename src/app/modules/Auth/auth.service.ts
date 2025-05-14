/* eslint-disable no-unused-vars */
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyUserCredentials } from "../user/user.utils";
import config from "../../config";
import User from "../user/user.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import AppError from "../../errors/AppError";
const loginUserIntoDB = async (payload: TLoginUser) => {
  // Checking if the user exists or not

  const user = await verifyUserCredentials(payload.id, payload.password);

  // create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.expires_in_access_token as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    config.expires_in_refresh_token as string
  );

  return {
    refreshToken,
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await verifyUserCredentials(
    userData.userId,
    payload.oldPassword
  );

  // hashed new password instance
  const hashedPassword = await bcrypt.hash(payload.newPassword, Number(10));

  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: Date.now(),
    }
  );

  return null;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  // verify token
  const decoded = jwt.verify(
    token,
    config.refresh_token_secret as string
  ) as JwtPayload;

  const { userId, iat } = decoded;

  const user = await verifyUserCredentials(userId);
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.expires_in_access_token as string
  );
  return {
    accessToken,
  };
};

const forgetPassword = async (id: string) => {
  const user = await verifyUserCredentials(id);

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    "5m"
  );

  const resetUILink = `http://localhost:5000/api/v1?id=${user.id}&token=${resetToken}`;
  console.log(resetUILink);
};

export const AuthService = {
  loginUserIntoDB,
  changePasswordIntoDB,
  refreshToken,
  forgetPassword,
};
