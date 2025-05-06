import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import { AcademicSemesterController } from "./academicSemester.controller";

const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(AcademicSemesterValidation.academicSemesterValidationSchema),
  AcademicSemesterController.createSemester
);

router.get("/", AcademicSemesterController.getAllSemester);

router.get("/:id", AcademicSemesterController.getSingleSemester);
router.patch(
  "/:id",
  validateRequest(AcademicSemesterValidation.academicSemesterValidationSchema),
  AcademicSemesterController.updateSemester
);

export const AcademicSemesterRoutes = router;
