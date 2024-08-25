import { z } from "zod";
import { basicString, codeString, ageSchema, TToastForm, integerStringSchema, ciSchema } from "./utils";
import { TArea } from "./area.schema";

// Agricola validation schema
export const agricolaValidationSchema = z.object({
  name: basicString,
  ci: ciSchema, // Assuming CI is a code-like string
  age: ageSchema,
  direction: basicString,
  skill: basicString,
  area: integerStringSchema // Assuming area is referenced by ID
});

// Agricola types
export type TAgricola = {
  trabajador_id: number;
  name: string;
  ci: string;
  age: number;
  direction: string;
  skill: string,
  area: number; // Assuming area is referenced by ID
};

export type TAgricolaRead = {
  trabajador_id: number;
  name: string;
  ci: string;
  age: number;
  direction: string;
  skill: string,
  area: TArea; // Assuming area is referenced by ID
};

export type TAgricolaFields = z.infer<typeof agricolaValidationSchema>;
export type TAgricolaErrors = {
  name?: string;
  ci?: string;
  age?: string;
  direction?: string;
  skill?: string;
  area?: string;
  root?: string;
};
export type TAgricolaFormActionState = {
  trabajador_id?: number;
  toast?: TToastForm;
  fields?: TAgricolaFields;
  errors?: TAgricolaErrors;
  type?: "created" | "edited" | "error";
  agricola?: TAgricola;
};
export type TAgricolaDeleteActionState = {
  trabajador_id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error";
};
