
import { z } from "zod";
import { basicString, codeString, TToastForm, integerStringSchema, selectFieldSchema } from "./utils";
import { TTipoCultivo } from "./tipoc.schema";
import { TTrabajador } from "./trabajador.schema";

// Cultivo validation schema
export const cultivoValidationSchema = z.object({
  code: codeString,
  name: basicString,
  status: selectFieldSchema,
  type: selectFieldSchema, // Assuming type is referenced by ID
  manager: selectFieldSchema, // Assuming manager is referenced by ID
});

// Cultivo types
export type TCultivo = {
  id: number;
  code: string;
  name: string;
  status: string;
  type: number; // Assuming type is referenced by ID
  manager: number; // Assuming manager is referenced by ID
};

export type TCultivoRead = {
  id: number;
  code: string;
  name: string;
  status: string;
  type: TTipoCultivo; // Assuming type is referenced by ID
  manager: TTrabajador; // Assuming manager is referenced by ID
}

export type TCultivoFields = z.infer<typeof cultivoValidationSchema>;
export type TCultivoErrors = {
  code?: string;
  name?: string;
  status?: string;
  type?: string;
  manager?: string;
  root?: string;
};
export type TCultivoFormActionState = {
  id?: number;
  toast?: TToastForm;
  fields?: TCultivoFields;
  errors?: TCultivoErrors;
  type?: "created" | "edited" | "error";
  cultivo?: TCultivo;
};
export type TCultivoDeleteActionState = {
  id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error";
};
