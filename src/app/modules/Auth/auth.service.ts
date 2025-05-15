import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyUserCredentials } from "../user/user.utils";
import config from "../../config";
import User from "../user/user.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import AppError from "../../errors/AppError";
import { sendEmail } from "../../utils/sendEmail";
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
  await verifyUserCredentials(userData.userId, payload.oldPassword);

  // hashed new password instance
  const hashedPassword = await bcrypt.hash(payload.newPassword, Number(10));

  await User.findOneAndUpdate(
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

  const { userId } = decoded;

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

  const resetUILink = `${config.base_url}/api/v1?id=${user.id}&token=${resetToken}`;

  sendEmail(user.email, resetUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: any
) => {
  const user = await verifyUserCredentials(payload.id);

  const decoded = jwt.verify(
    token,
    config.refresh_token_secret as string
  ) as JwtPayload;

  // console.log(user, decoded);
  if (decoded.userId !== user.id || decoded.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You are Forbidden");
  }
  // hashed new password instance
  const hashedPassword = await bcrypt.hash(payload.newPassword, Number(10));

  await User.findOneAndUpdate(
    { id: decoded.userId, role: decoded.role },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: Date.now(),
    }
  );
};

export const AuthService = {
  loginUserIntoDB,
  changePasswordIntoDB,
  refreshToken,
  forgetPassword,
  resetPassword,
};
