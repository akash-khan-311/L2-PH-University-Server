import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseService } from "./course.service";
import httpStatus from "http-status";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDB(req.body);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Course created successfully",
      data: result,
    });
  }
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCoursesFromDB(req.query);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Courses fetched successfully",
      data: result,
    });
  }
});

const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseService.getSingleCourseFromDB(id);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Course fetched successfully",
      data: result,
    });
  }
});
const deleteCourses = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseService.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course deleted successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await CourseService.updateCourseIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const payload = req.body;
  const result = await CourseService.assignFacultiesWithCourseIntoDB(
    courseId,
    payload
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

export const CourseController = {
  getAllCourse,
  getSingleCourse,
  deleteCourses,
  createCourse,
  updateCourse,
  assignFacultiesWithCourse,
};
