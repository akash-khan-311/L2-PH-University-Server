import { z } from "zod";

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic Department must be a string",
      required_error: "Academic Department is required",
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic Department must be a string",
        required_error: "Academic Department is required",
      })
      .optional(),
  }),
});

export const AcademicFacultyValidation = {
  academicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
