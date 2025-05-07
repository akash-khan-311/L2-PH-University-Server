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

export const AcademicFacultyValidation = {
  academicDepartmentValidationSchema,
};
