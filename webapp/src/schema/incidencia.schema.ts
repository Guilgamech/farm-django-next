import { z } from "zod";
import {dateStringSchema ,integerStringSchema , basicString, codeString, decimalStringSchema, TToastForm, selectFieldSchema } from "./utils";
import { TArea } from "./area.schema";


export const incidenciaValidationSchema = z.object({
  type: basicString,
  date: z.string().refine((date) => date.length > 1 ? !isNaN(Date.parse(date)) : false, {
		message: "Selccione una fecha correcta",
	}).optional(),
  status: basicString,
  damage: basicString,
  area: selectFieldSchema
});

export type TIncidencia = {
  id: number;
  type: string;
  date: string; // Assuming the date will be a string in ISO format
  status: string;
  damage: string;
  area: number; // Assuming area is referenced by ID

  
};
export type TIncidenciaRead = {
  id: number;
  type: string;
  date: string; // Assuming the date will be a string in ISO format
  status: string;
  damage: string;
  area: TArea; // Assuming area is referenced by ID

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
