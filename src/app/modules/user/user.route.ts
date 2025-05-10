import express from "express";
import { UserControllers } from "./user.controller";
import { Validation } from "../student/student.validation";

import validateRequest from "../../middleware/validateRequest";
const router = express.Router();

router.post(
  "/create-student",
  validateRequest(Validation.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post("/create-faculty", UserControllers.createFaculty);
export const UserRoutes = router;
