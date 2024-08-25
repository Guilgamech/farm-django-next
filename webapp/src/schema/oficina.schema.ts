import { z } from "zod";
import { basicString, codeString, passwordSchema, TToastForm, integerStringSchema, ageSchema, ciSchema } from "./utils";
import { TArea } from "./area.schema";
import { TRol } from "./rol.schema";

// Oficina validation schema
export const oficinaValidationSchema = z.object({
  name: basicString,
  username: basicString,
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
  ci: ciSchema, // Assuming CI is a code-like string
  age: ageSchema,
  direction: basicString,
  rol: integerStringSchema,
  area: integerStringSchema,  // Assuming area is referenced by ID
  password: passwordSchema,
});

// Oficina types
export type TOficina = {
  trabajador_id: number;
  password: string;
  email: string;
  name: string;
  ci: string;
  age: number;
  direction: string;
  username: string;
  rol: number;
  area: number;  // Assuming area is referenced by ID
};

export type TOficinaRead = {
    trabajador_id: number;
    password: string;
    email: string;
    name: string;
    ci: string;
    age: number;
    direction: string;
    username: string;
    rol: TRol;
    area: TArea;  // Assuming area is referenced by ID
};

export type TOficinaFields = z.infer<typeof oficinaValidationSchema>;
export type TOficinaErrors = {
    password?: string;
    email?: string;
    name?: string;
    ci?: string;
    age?: string;
    direction?: string;
    username?: string;
    rol?: string;
    area?: string;
    root?: string;
};
export type TOficinaFormActionState = {
  trabajador_id?: number;
  toast?: TToastForm;
  fields?: TOficinaFields;
  errors?: TOficinaErrors;
  type?: "created" | "edited" | "error";
  oficina?: TOficina;
};
export type TOficinaDeleteActionState = {
  trabajador_id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error";
};
