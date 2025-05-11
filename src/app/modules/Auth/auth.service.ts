import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import { verifyUserCredentials } from "../user/user.utils";
import config from "../../config";

const loginUserIntoDB = async (payload: TLoginUser) => {
  // Checking if the user exists or not

  const user = await verifyUserCredentials(payload.id, payload.password);
  // create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(
    jwtPayload,
    config.access_token_secret as string,
    {
      expiresIn: "10d",
    }
  );

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthService = {
  loginUserIntoDB,
};
