import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";
import httpStatus from "http-status";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body
  );
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Department created successfully",
      data: result,
    });
  }
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentsFromDB();
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Departments fetched successfully",
      data: result,
    });
  }
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result =
    await AcademicDepartmentService.singleAcademicDepartmentFromDB(id);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department Fetched Successfully",
      data: result,
    });
  }
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedDepartment = req.body;
  const result = await AcademicDepartmentService.updateAcademicDepartmentIntoDB(
    id,
    updatedDepartment
  );

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department Updated Successfully",
      data: result,
    });
  }
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
