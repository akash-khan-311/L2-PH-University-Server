import { z } from "zod";
const digitOnlyRegex = /^[0-9]+$/;
const nameRegex = /^[A-Za-z\s'-]+$/;
// 🔠 Nested Name schema
const userNameValidationSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .regex(nameRegex, {
      message: "First Name must contain only letters.",
    }),
  middleName: z.string().optional(),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .regex(nameRegex, {
      message: "Last Name must contain only letters.",
    }),
});

// 👨‍👩‍👧 Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z
    .string({ required_error: "Father Name is required" })
    .regex(nameRegex, {
      message: "Last Name must contain only letters.",
    }),
  fatherOccupation: z.string({
    required_error: "Father Occupation is required",
  }),
  fatherContactNo: z
    .string({
      required_error: "Father Contact Number is required",
    })
    .regex(digitOnlyRegex, {
      message: "Father Contact Number must be digits only",
    }),
  motherName: z
    .string({ required_error: "Mother Name is required" })
    .regex(nameRegex, {
      message: "Last Name must contain only letters.",
    }),
  motherOccupation: z.string({
    required_error: "Mother Occupation is required",
  }),
  motherContactNo: z
    .string({
      required_error: "Mother Contact Number is required",
    })
    .regex(digitOnlyRegex, {
      message: "Father Contact Number must be digits only",
    }),
});

// 👥 Local Guardian schema
const localGuardianValidationSchema = z.object({
  name: z
    .string({ required_error: "Local Guardian Name is required" })
    .regex(nameRegex, {
      message: "Last Name must contain only letters.",
    }),
  occupation: z.string({ required_error: "Guardian Occupation is required" }),
  contactNo: z
    .string({
      required_error: "Guardian Contact Number is required",
    })
    .regex(digitOnlyRegex, {
      message: "Father Contact Number must be digits only",
    }),
  relationship: z.string({
    required_error: "Guardian Relationship is required",
  }),
});

// 🧑‍🎓 Main Student schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female", "other"], {
        required_error: "Gender is required",
        invalid_type_error: "Gender must be 'male' or 'female'",
      }),
      password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" }),
      // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
      //   message:
      //     "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      // }),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: "Invalid email address" }),
      contactNo: z
        .string({ required_error: "Contact Number is required" })
        .regex(digitOnlyRegex, {
          message: "Father Contact Number must be digits only",
        }),
      emergencyContactNo: z
        .string({
          required_error: "Emergency Contact Number is required",
        })
        .regex(digitOnlyRegex, {
          message: "Father Contact Number must be digits only",
        }),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string({
        required_error: "Present Address is required",
      }),
      permanentAddress: z.string({
        required_error: "Permanent Address is required",
      }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().url().optional(),
    }),
  }),
});

export const Validation = {
  createStudentValidationSchema,
};
