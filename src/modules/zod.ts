import { z } from "zod";
export const registerUserSchema = z.object({
  name: z.string().min(5, { message: "No mínimo um username de 5 letras" }),
  password: z.string().max(5, { message: "No máximo uma senha de 5 letras" }),
  confirmPassword: z.string(),
  email: z.string().min(5, { message: "No mínimo um email de 5 letras" }),
});
export type registerSchema = z.infer<typeof registerUserSchema>;
