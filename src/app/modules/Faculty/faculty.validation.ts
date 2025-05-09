import { z } from "zod";

// ENUMS
const genderEnum = z.enum(["male", "female", "other"]);
const bloodGroupEnum = z.enum([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);
const digitOnlyRegex = /^[0-9]+$/;
const nameRegex = /^[A-Za-z\s'-]+$/;

// Nested Name Schema
const userNameSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .trim()
    .max(20, "First Name must be less than 20 characters")
    .regex(nameRegex, { message: "First Name must contain only letters." }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .trim()
    .max(20, "Last Name must be less than 20 characters")
    .regex(nameRegex, { message: "Last Name must contain only letters." }),
});

export const updateFacultyValidationSchema = z.object({
  body: z
    .object({
      id: z.string().optional(),
      user: z.string().optional(),
      designation: z.string().optional(),
      name: userNameSchema.partial().optional(),
      gender: genderEnum.optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z
        .string()
        .regex(digitOnlyRegex, { message: "Contact must contain digits only" })
        .optional(),
      emergencyContactNo: z
        .string()
        .regex(digitOnlyRegex, {
          message: "Emergency Contact must contain digits only",
        })
        .optional(),
      bloodGroup: bloodGroupEnum.optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().url().optional(),
      academicDepartment: z.string().optional(),
    })
    .partial(),
});

// Create Faculty Validation
export const createFacultyValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "ID is required" }),
    user: z.string({ required_error: "User ObjectId is required" }),
    designation: z.string({ required_error: "Designation is required" }),
    name: userNameSchema,
    gender: genderEnum,
    dateOfBirth: z.string().optional(), // could be converted to date on backend
    email: z.string({ required_error: "Email is required" }).email(),
    contactNo: z
      .string({ required_error: "Contact Number is required" })
      .regex(digitOnlyRegex, {
        message: "Contact Number must contain digits only",
      }),
    emergencyContactNo: z
      .string({ required_error: "Emergency Contact Number is required" })
      .regex(digitOnlyRegex, {
        message: "Emergency Contact Number must contain digits only",
      }),
    bloodGroup: bloodGroupEnum.optional(),
    presentAddress: z.string({ required_error: "Present Address is required" }),
    permanentAddress: z.string({
      required_error: "Permanent Address is required",
    }),
    profileImg: z.string().url().optional(),
    academicDepartment: z.string({
      required_error: "Academic Department ID is required",
    }),
  }),
});

export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
