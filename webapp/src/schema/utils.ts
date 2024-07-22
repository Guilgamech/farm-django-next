import { z } from "zod";
export const toastFormSchema = z.object({
	type: z.enum(["success", "error"]),
	title: z.string(),
	message: z.string(),
});
export type TToastForm = z.infer<typeof toastFormSchema>;
export const codeString = z
	.string()
	.min(4, { message: "Necesita al menos 4 caracteres" })
	.regex(/^[0-9a-z\-]+$/, { message: "Solo se permiten los caracteres 0-9, a-z, A-Z, - y espacio" });
// Expresión regular para aceptar solo números que soportan decimales
const decimalNumberRegex = /^\d+(\.\d+)?$/;

// Esquema de Zod que valida la cadena con la expresión regular
export const decimalStringSchema = z
	.string()
	.regex(decimalNumberRegex, "Solo se aceptan números decimales")

export const selectFieldSchema = z
	.string()
  .min(1, "Este campo es Requerido")
	

export const basicString = z
	.string()
	.min(4, { message: "Necesita al menos 4 caracteres" })
	.regex(/^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\-.\s]+$/, { message: "Solo se permiten los caracteres 0-9, a-z, A-Z, -, . y espacio" });

export const integerStringSchema = z.string().refine((value) => !isNaN(parseInt(value, 10)), {
	message: "Must be a valid integer",
});

export const dateStringSchema = z.string().refine((date) => !isNaN(Date.parse(date)), {
	message: "Invalid date format",
});
