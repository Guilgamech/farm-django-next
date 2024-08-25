import { z } from "zod";
import {basicString, codeString, decimalStringSchema, TToastForm, selectFieldSchema } from "./utils";
import { TTipoCultivo } from "./tipoc.schema";


export const enfermedadValidationSchema = z.object({
  name: basicString,
  category: basicString,
  type_crops: selectFieldSchema
});

export type TEnfermedad = {
  id: number;
  name: string;
  category: string;
  type_crops: number; // Assuming tipocultivo is referenced by ID  
};
export type TEnfermedadRead = {
  id: number;
  name: string;
  category: string;
  type_crops: TTipoCultivo; // Assuming tipocultivo is referenced by ID
};

export type TEnfermedadFields = z.infer<typeof enfermedadValidationSchema>;
export type TEnfermedadErrors = {
  name?: string;
  category?: string;
  type_crops?: string;
  root?: string;
};
export type TEnfermedadFormActionState = {
  id?: number;
  toast?: TToastForm;
  fields?: TEnfermedadFields;
  errors?: TEnfermedadErrors;
  type?: "created" | "edited" | "error";
  enfermedad?: TEnfermedad;
};
export type TEnfermedadDeleteActionState = {
  id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error";
};
