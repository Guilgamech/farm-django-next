import { z } from "zod";
import { basicString, codeString, decimalStringSchema, TToastForm, integerStringSchema } from "./utils";
import { TArea } from "./area.schema";

// Trabajador validation schema
export const trabajadorValidationSchema = z.object({
  trabajador_id: integerStringSchema.optional(), // Optional for creation, required for updates
  name: basicString,
  ci: codeString, // Assuming CI is a code-like string
  age: integerStringSchema,
  direction: basicString,
  area: integerStringSchema // Assuming area is referenced by ID
});

// Trabajador types
export type TTrabajador = {
  trabajador_id: number;
  name: string;
  ci: string;
  age: number;
  direction: string;
  area: TArea; // Assuming area is referenced by ID
};

export type TTrabajadorFields = z.infer<typeof trabajadorValidationSchema>;
export type TTrabajadorErrors = {
  trabajador_id?: string;
  name?: string;
  ci?: string;
  age?: string;
  direction?: string;
  area?: string;
  root?: string;
};
export type TTrabajadorFormActionState = {
  trabajador_id?: number;
  toast?: TToastForm;
  fields?: TTrabajadorFields;
  errors?: TTrabajadorErrors;
  type?: "created" | "edited" | "error";
  trabajador?: TTrabajador;
};
export type TTrabajadorDeleteActionState = {
  trabajador_id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error";
};
