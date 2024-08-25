import { z } from "zod";
import {basicString, codeString, decimalStringSchema, TToastForm, selectFieldSchema } from "./utils";
import { TEnfermedad, TEnfermedadRead } from "./enfermedad.schema";


export const tratamientoValidationSchema = z.object({
  name: basicString,
  treatment: basicString,
  disease: selectFieldSchema
});

export type TTratamiento = {
  id: number;
  name: string;
  treatment: string;
  disease: number; // Assuming tipocultivo is referenced by ID  
};
export type TTratamientoRead = {
  id: number;
  name: string;
  treatment: string;
  disease: TEnfermedadRead; // Assuming tipocultivo is referenced by ID
};

export type TTratamientoFields = z.infer<typeof tratamientoValidationSchema>;
export type TTratamientoErrors = {
  name?: string;
  treatment?: string;
  disease?: string;
  root?: string;
};
export type TTratamientoFormActionState = {
  id?: number;
  toast?: TToastForm;
  fields?: TTratamientoFields;
  errors?: TTratamientoErrors;
  type?: "created" | "edited" | "error";
  tratamiento?: TTratamiento;
};
export type TTratamientoDeleteActionState = {
  id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error";
};
