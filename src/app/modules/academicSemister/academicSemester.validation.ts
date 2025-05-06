import zod from "zod";
import {
  academicSemesterCode,
  academicSemesterName,
  Months,
} from "./academicSemester.constant";

const academicSemesterValidationSchema = zod.object({
  body: zod.object({
    name: zod.object({
      name: zod.enum([...academicSemesterName] as [string, ...string[]]),
    }),
    code: zod.enum([...academicSemesterCode] as [string, ...string[]]),
    year: zod.date({
      required_error: "Year is required",
    }),
    startMonth: zod.enum([...Months] as [string, ...string[]]),
    endMonth: zod.enum([...Months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidation = {
  academicSemesterValidationSchema,
};
