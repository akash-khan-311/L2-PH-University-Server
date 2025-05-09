import { z } from "zod";

const preRequisiteCourseValidationSchema = z.object({
  course: z.string({
    required_error: "Course is required",
  }),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    prefix: z.string({
      required_error: "Prefix is required",
    }),
    code: z.number({
      required_error: "Code is required",
    }),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
    credits: z.number({
      required_error: "Credit is required",
    }),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
