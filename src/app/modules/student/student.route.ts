import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { Validation } from "./student.validation";
const router = express.Router();
// router.post("/create-student", StudentController.createStudent);
router.get("/all-students", StudentController.getAllStudents);
router.get("/:id", StudentController.getSingleStudent);
router.delete("/:id", StudentController.deleteStudent);
router.patch(
  "/:id",
  validateRequest(Validation.updateStudentValidationSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
