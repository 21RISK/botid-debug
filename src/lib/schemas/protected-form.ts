import { z } from "zod";

// Schema for the simplified protected form
export const protectedFormSchema = z.object({
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(200, "Message must be less than 200 characters"),
});

export type ProtectedFormSchema = typeof protectedFormSchema;
