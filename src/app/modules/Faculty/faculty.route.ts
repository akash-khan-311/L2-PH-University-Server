import express from "express";
import { FacultyController } from "./faculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyController.getSingleFaculty
);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyController.getallFaculties
);
router.patch(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(updateFacultyValidationSchema),
  FacultyController.updateFaculty
);

router.delete("/:id", auth(USER_ROLE.admin), FacultyController.deleteFaculty);

export const FacultyRoutes = router;
