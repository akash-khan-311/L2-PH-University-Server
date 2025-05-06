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

export const UserRoutes = router;
