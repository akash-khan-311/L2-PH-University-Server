/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { verifyUserCredentials } from "../modules/user/user.utils";
import User from "../modules/user/user.model";

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // if the token is not found
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized");
    }
    // check if the token is valid | verify token
    const decoded = jwt.verify(
      token,
      config.access_token_secret as string
    ) as JwtPayload;

    const { userId, role, iat } = decoded;
    const user = await verifyUserCredentials(userId);

    if (roles.length && !roles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not Authorized");
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
