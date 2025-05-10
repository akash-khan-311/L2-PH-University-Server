import express from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidation } from "./course.validation";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse
);

router.get("/", CourseController.getAllCourse);
router.get("/:id", CourseController.getSingleCourse);
router.delete("/:id", CourseController.deleteCourses);
router.patch(
  "/:id",
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse
);

router.put(
  "/courseId/assign-faculties",
  CourseController.assignFacultiesWithCourse
);

export const CourseRoutes = router;
