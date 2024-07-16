import { z } from "zod";
export const authSchema = z.object({
	email: z.string().min(1, {
		message: "Campo Requerido",
	}).email({message: "Entre un Email válido"}),
	password: z
		.string()
		.trim()
		.min(1, { message: "Campo Requerido" })
		// .max(60, {
		// 	message: "Not more than 60 characters",
		// })
		// .regex(/(?=.*[a-z])/, {
		// 	message: "At least one lower case character",
		// })
		// .regex(/(?=.*[0-9])/, {
		// 	message: "At least one digit",
		// }),
});

export const authSuccessSchema = z.object({
  access: z.string(),
  refresh: z.number(),
  
});

export const authResponseSchema = z.object({
  access: z.union([z.string(), z.undefined()]),
  refresh: z.union([z.string(), z.undefined()]),
  detail: z.union([z.string(), z.undefined()]),
  email: z.union([z.array(z.string()), z.undefined()]),
  password: z.union([z.array(z.string()), z.undefined()]),
  error: z.union([z.string(), z.undefined()]),
});