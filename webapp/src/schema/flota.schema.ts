import { z } from "zod";
import { basicString, codeString, TToastForm, integerStringSchema, selectFieldSchema } from "./utils";
import { TTipoFlota } from "./tipof.schema";
import { TTrabajador } from "./trabajador.schema";
import { TArea } from "./area.schema";

// Flota validation schema
export const flotaValidationSchema = z.object({
  code: codeString,
  status: selectFieldSchema,
  type: selectFieldSchema, // Assuming type is referenced by ID
  manager: selectFieldSchema, // Assuming manager is referenced by ID
  area: selectFieldSchema // Assuming area is referenced by ID
});

// Flota types
export type TFlota = {
  id: number;
  code: string;
  status: string;
  type: number; // Assuming type is referenced by ID
  manager: number; // Assuming manager is referenced by ID
  area: number; // Assuming area is referenced by ID
};

export type TFlotaRead = {
  id: number;
  code: string;
  status: string;
  type: TTipoFlota; // Assuming type is referenced by ID
  manager: TTrabajador; // Assuming manager is referenced by ID
  area: TArea;
}

export type TFlotaFields = z.infer<typeof flotaValidationSchema>;
export type TFlotaErrors = {
  code?: string;
  status?: string;
  type?: string;
  manager?: string;
  area?: string;
  root?: string;
};
export type TFlotaFormActionState = {
  id?: number;
  toast?: TToastForm;
  fields?: TFlotaFields;
  errors?: TFlotaErrors;
  type?: "created" | "edited" | "error";
  flota?: TFlota;
};
export type TFlotaDeleteActionState = {
  id: number;
  toast?: TToastForm;
  type?: "deleted" | "default" | "error";
};
