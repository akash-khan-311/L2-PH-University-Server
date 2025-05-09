import express from "express";
import { FacultyController } from "./faculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";

const router = express.Router();

router.get("/:id", FacultyController.getSingleFaculty);
router.get("/", FacultyController.getallFaculties);
router.patch(
  "/:id",
  validateRequest(updateFacultyValidationSchema),
  FacultyController.updateFaculty
);

router.delete("/:id", FacultyController.deleteFaculty);

export const FacultyRoutes = router;
