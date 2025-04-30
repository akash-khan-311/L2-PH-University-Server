import e, { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";
import { z } from "zod";

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
    console.log(error.message || "Error creating student:", error);
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
    console.error("Error fetching students:", error);
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
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
