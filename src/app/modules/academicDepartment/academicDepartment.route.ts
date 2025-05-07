import express from "express";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidation } from "./academicDepartment.validation";

const router = express.Router();

router.post(
  "/create-department",
  validateRequest(AcademicFacultyValidation.academicDepartmentValidationSchema),
  AcademicDepartmentController.createAcademicDepartment
);

router.get("/", AcademicDepartmentController.getAllAcademicDepartment);
router.get("/:id", AcademicDepartmentController.getSingleAcademicDepartment);
router.patch(
  "/:id",
  validateRequest(
    AcademicFacultyValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
