import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { FacultyService } from "./faculty.service";

const getSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFacultyFromDB(id);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Faculty not found 😒",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty fetched successfully",
    data: result,
  });
});

const getallFaculties = catchAsync(async (req, res) => {
  const result = await FacultyService.getAllFacultiesFromDB(req.query);

  // console.log(req.cookies);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Faculties not found 😒",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties fetched successfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { faculty } = req.body;

  const result = await FacultyService.updateFacultyIntoDB(id, faculty);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty updated successfully",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Faculty not found 😒",
    });
  }
});

const deleteFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty deleted successfully",
    data: result,
  });
});

export const FacultyController = {
  getSingleFaculty,
  getallFaculties,
  updateFaculty,
  deleteFaculty,
};
