import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "validation.required" })
    .max(100, { message: "validation.maxLength" })
    .regex(/\S/, { message: "validation.notEmpty" }),
  native_language: z
    .string()
    .min(1, { message: "validation.required" })
    .max(10, { message: "validation.maxLength" }),
  target_language: z
    .string()
    .min(1, { message: "validation.required" })
    .max(10, { message: "validation.maxLength" }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
