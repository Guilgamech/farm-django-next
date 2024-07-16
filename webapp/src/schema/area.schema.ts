import { z } from "zod";
import { basicString, codeString, decimalStringSchema, TToastForm } from "./utils";
export const areaValidationSchema = z.object({
	code: codeString,
	name: basicString,
	total_area: decimalStringSchema,
});

export type TArea = {
	id: number;
	code: string;
	name: string;
	total_area: number;
};

export type TAreaFields = z.infer<typeof areaValidationSchema>;
export type TAreaErrors = {
  code?: string
  name?: string
  total_area?: string
  root?: string
}
export type TAreaFormActionState = {
	id?: number;
	toast?: TToastForm;
	fields?: TAreaFields;
  errors?: TAreaErrors;
  type?: "created" | "edited" | "error"
  area?: TArea
};
export type TAreaDeleteActionState = {
  id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error"
}