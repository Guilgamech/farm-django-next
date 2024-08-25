import { z } from "zod";


export const toastFormSchema = z.object({
	type: z.enum(["success", "error"]),
	title: z.string(),
	message: z.string(),
});

export const ciSchema = z
  .string()
  .refine((value) => /^[0-9]{1,11}$/.test(value), {
    message: "El CI debe ser un número positivo y no más de 11 dígitos",
  });

export const ageSchema = z
  .string()
  .refine((value) => {
    const num = parseInt(value, 10);
    return num > 0 && num <= 100;
  }, {
    message: "La edad debe ser un número entero entre 1 y 100",
  });

export const passwordSchema = z
  .string()
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
  .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
  .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
  .regex(/[@$!%*?&#]/, { message: "La contraseña debe contener al menos un carácter especial (@$!%*?&#)" });

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
