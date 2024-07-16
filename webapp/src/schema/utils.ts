import { z } from "zod";
export const toastFormSchema = z.object({
  type: z.enum(["success", "error"]),
  title: z.string(),
  message: z.string()
})
export type TToastForm = z.infer<typeof toastFormSchema>;
export const codeString = z.string()
  .min(4, { message: "Necesita al menos 4 caracteres" })
  .regex(/^[0-9a-z\-]+$/, { message: "Solo se permiten los caracteres 0-9, a-z, A-Z, - y espacio" });
// Expresión regular para aceptar solo números que soportan decimales
const decimalNumberRegex = /^\d+(\.\d+)?$/;

// Esquema de Zod que valida la cadena con la expresión regular
export const decimalStringSchema = z.string().regex(decimalNumberRegex, "Solo se aceptan números decimales");

export const basicString = z.string()
  .min(4, { message: "Necesita al menos 4 caracteres" })
  .regex(/^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\-.\s]+$/, { message: "Solo se permiten los caracteres 0-9, a-z, A-Z, -, . y espacio" });