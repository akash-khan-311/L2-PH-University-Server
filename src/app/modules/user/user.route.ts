import express from "express";
import { UserControllers } from "./user.controller";
import { Validation } from "../student/student.validation";

import validateRequest from "../../middleware/validateRequest";
import { AdminValidations } from "../admin/admin.validatin";
const router = express.Router();
router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);
router.post(
  "/create-student",
  validateRequest(Validation.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post("/create-faculty", UserControllers.createFaculty);
export const UserRoutes = router;
