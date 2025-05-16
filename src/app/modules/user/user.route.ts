import express from "express";
import { UserControllers } from "./user.controller";
import { Validation } from "../student/student.validation";

import validateRequest from "../../middleware/validateRequest";
import { AdminValidations } from "../admin/admin.validatin";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import { UserValidation } from "./user.validation";
const router = express.Router();
router.post(
  "/create-admin",

  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);
router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(Validation.createStudentValidationSchema),
  UserControllers.createStudent
);
router.get("/me", auth("student", "admin", "faculty"), UserControllers.getMe);
router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  UserControllers.createFaculty
);
router.post(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus
);
export const UserRoutes = router;
