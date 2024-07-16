import { z } from "zod";
import { basicString, codeString, decimalStringSchema, TToastForm } from "./utils";
export const tipocultivoValidationSchema = z.object({
	name: basicString,
});

export type TTipoCultivo = {
	id: number;
	name: string;
};

export type TTipoCultivoFields = z.infer<typeof tipocultivoValidationSchema>;
export type TTipoCultivoErrors = {
  name?: string
  root?: string
}
export type TTipoCultivoFormActionState = {
	id?: number;
	toast?: TToastForm;
	fields?: TTipoCultivoFields;
  errors?: TTipoCultivoErrors;
  type?: "created" | "edited" | "error"
  tipocultivo?: TTipoCultivo
};
export type TTipoCultivoDeleteActionState = {
  id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error"
}