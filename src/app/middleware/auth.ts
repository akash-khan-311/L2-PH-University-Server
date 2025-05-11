import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // if the token is not found
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized");
    }
    // check if the token is valid | verify token
    jwt.verify(token, config.access_token_secret as string, (err, decoded) => {
      if (err || !decoded) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized");
      }
      const userRole = (decoded as JwtPayload).role;
      if (roles.length && !roles.includes(userRole)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized");
      }

      req.user = decoded as JwtPayload;
    });
    next();
  });
};

export default auth;
