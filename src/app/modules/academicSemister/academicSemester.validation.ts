import zod from "zod";

const academicSemesterValidationSchema = zod.object({
  body: zod.object({
    name: zod.string({
      required_error: "Name is required",
    }),
    code: zod.string({
      required_error: "Code is required",
    }),
    year: zod.number({
      required_error: "Year is required",
    }),
    startMonth: zod.string({
      required_error: "Start month is required",
    }),
    endMonth: zod.string({
      required_error: "End month is required",
    }),
  }),
});

export const AcademicSemesterValidation = {
  academicSemesterValidationSchema,
};
