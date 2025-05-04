import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .max(20, { message: "Password must be at most 20 characters long" })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
