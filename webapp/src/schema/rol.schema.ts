import { z } from "zod";
import { basicString, codeString, decimalStringSchema, TToastForm } from "./utils";
export const rolValidationSchema = z.object({
	name: basicString,
});

export type TRol = {
	id: number;
	name: string;
};

export type TRolFields = z.infer<typeof rolValidationSchema>;
export type TRolErrors = {
  name?: string
  root?: string
}
export type TRolFormActionState = {
	id?: number;
	toast?: TToastForm;
	fields?: TRolFields;
  errors?: TRolErrors;
  type?: "created" | "edited" | "error"
  rol?: TRol
};
export type TRolDeleteActionState = {
  id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error"
}