import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;
    const validatedStudentData = studentValidationSchema.parse(studentData);
    const result =
      await StudentServices.createStudentIntoDB(validatedStudentData);
    if (result) {
      res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    if (result) {
      res.status(200).json({
        success: true,
        message: "Students fetched successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Student fetched successfully",
        data: result,
      });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await StudentServices.deleteStudentFromDb(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await StudentServices.updateStudentFromDb(id, updatedData);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: result,
      });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
