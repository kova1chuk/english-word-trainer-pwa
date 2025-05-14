import { z } from "zod";

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 50;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "validation.required" })
    .email({ message: "validation.email" })
    .max(100, { message: "validation.maxLength" })
    .regex(/\S/, { message: "validation.notEmpty" }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: "validation.minLength" })
    .max(PASSWORD_MAX_LENGTH, { message: "validation.maxLength" })
    .regex(/\S/, { message: "validation.notEmpty" })
    .regex(/[A-Z]/, { message: "validation.password.uppercase" })
    .regex(/[a-z]/, { message: "validation.password.lowercase" })
    .regex(/[0-9]/, { message: "validation.password.number" }),
});

export const signUpSchema = signInSchema
  .extend({
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, { message: "validation.minLength" })
      .max(PASSWORD_MAX_LENGTH, { message: "validation.maxLength" })
      .regex(/\S/, { message: "validation.notEmpty" })
      .regex(/[A-Z]/, { message: "validation.password.uppercase" })
      .regex(/[a-z]/, { message: "validation.password.lowercase" })
      .regex(/[0-9]/, { message: "validation.password.number" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "validation.password.special",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.password.match",
    path: ["confirmPassword"],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
