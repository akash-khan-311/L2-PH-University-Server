import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // const validatedStudentData = studentValidationSchema.parse(studentData);
  const result = await UserServices.createStudentIntoDB(password, studentData);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  }
});

export const UserControllers = {
  createStudent,
};
