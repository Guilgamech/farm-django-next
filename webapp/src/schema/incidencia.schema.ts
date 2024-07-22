import { z } from "zod";
import {dateStringSchema ,integerStringSchema , basicString, codeString, decimalStringSchema, TToastForm } from "./utils";


export const incidenciaValidationSchema = z.object({
  type: basicString,
  date: dateStringSchema,
  status: basicString,
  damage: basicString,
  area: integerStringSchema
});

export type TIncidencia = {
  id: number;
  type: string;
  date: string; // Assuming the date will be a string in ISO format
  status: string;
  damage: string;
  area: number; // Assuming area is referenced by ID

};

export type TIncidenciaFields = z.infer<typeof incidenciaValidationSchema>;
export type TIncidenciaErrors = {
  type?: string;
  date?: string;
  status?: string;
  damage?: string;
  area?: string;
  root?: string;
};
export type TIncidenciaFormActionState = {
  id?: number;
  toast?: TToastForm;
  fields?: TIncidenciaFields;
  errors?: TIncidenciaErrors;
  type?: "created" | "edited" | "error";
  incidencia?: TIncidencia;
};
export type TIncidenciaDeleteActionState = {
  id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error";
};
