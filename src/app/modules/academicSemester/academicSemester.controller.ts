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

const getAllSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllSemesterFromDb();
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester fetched successfully",
      data: result,
    });
  }
});

const getSingleSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemesterFromDB(id);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester fetched successfully",
      data: result,
    });
  }
});

const updateSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicSemesterService.updateSemesterIntoDB(
    id,
    updatedData
  );
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester updated successfully",
      data: result,
    });
  }
});
export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
};
