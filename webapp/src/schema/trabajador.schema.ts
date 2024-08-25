import { z } from "zod";
import { basicString, codeString, decimalStringSchema, TToastForm, integerStringSchema } from "./utils";
import { TArea } from "./area.schema";

// Trabajador validation schema
export const trabajadorValidationSchema = z.object({
 // Optional for creation, required for updates
  name: basicString,
  ci: codeString, // Assuming CI is a code-like string
  age: integerStringSchema,
  direction: basicString,
  type: basicString,
  area: integerStringSchema // Assuming area is referenced by ID
});

// Trabajador types
export type TTrabajador = {
  trabajador_id: number;
  name: string;
  ci: string;
  age: number;
  direction: string;
  type: string,
  area: TArea; // Assuming area is referenced by ID
};

export type TTrabajadorFields = z.infer<typeof trabajadorValidationSchema>;
export type TTrabajadorErrors = {

  name?: string;
  ci?: string;
  age?: string;
  direction?: string;
  type?: string;
  area?: string;
  root?: string;
};
