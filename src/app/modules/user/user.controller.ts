import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    // const validatedStudentData = studentValidationSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );
    if (result) {
      res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
