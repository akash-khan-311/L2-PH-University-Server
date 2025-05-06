import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";
import httpStatus from "http-status";

const createSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createSemesterIntoDB(req.body);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester created successfully",
      data: result,
    });
  }
});

export const AcademicSemesterController = {
  createSemester,
};
