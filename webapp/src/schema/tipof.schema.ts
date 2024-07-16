import { z } from "zod";
import { basicString, codeString, decimalStringSchema, TToastForm } from "./utils";
export const tipoflotaValidationSchema = z.object({
	name: basicString,
});

export type TTipoFlota = {
	id: number;
	name: string;
};

export type TTipoFlotaFields = z.infer<typeof tipoflotaValidationSchema>;
export type TTipoFlotaErrors = {
  name?: string
  root?: string
}
export type TTipoFlotaFormActionState = {
	id?: number;
	toast?: TToastForm;
	fields?: TTipoFlotaFields;
  errors?: TTipoFlotaErrors;
  type?: "created" | "edited" | "error"
  tipoflota?: TTipoFlota
};
export type TTipoFlotaDeleteActionState = {
  id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error"
}