import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: Secret,
  expiresIn: string
) => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: string) => {
  // verify token
  if (!token)
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  return jwt.verify(token, secret) as JwtPayload;
};
