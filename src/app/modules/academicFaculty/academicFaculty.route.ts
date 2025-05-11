import express from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty
);

router.get("/", auth(), AcademicFacultyController.getAllAcademicFaculties);

router.get("/:id", AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  "/:id",
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  AcademicFacultyController.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
