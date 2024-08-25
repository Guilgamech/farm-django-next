import { z } from "zod";
import { selectFieldSchema, TToastForm } from "./utils";

const CropSchema = z.object({
	id: z.number(),
	code: z.string(),
	name: z.string(),
	status: z.string(), // Puedes usar un enum si los valores son fijos
	type: z.number(),
	manager: z.number(),
});

export type TAgricolaCultivoSchemaCultivo = z.infer<typeof CropSchema>;

const AgricolaSchema = z.object({
	trabajador_id: z.number(),
	ci: z.string(),
	name: z.string(),
	direction: z.string(),
	skill: z.string(),
	area: z.number(), // Puedes usar un enum si los valores son fijos
	age: z.number(),
});

export type TCultivoAgricolaSchemaAgricola = z.infer<typeof AgricolaSchema>;


const AgricolaCultivoSchema = z.object({
	id: z.number(),
	worker: AgricolaSchema,
	crop: CropSchema,
});
export type TAgricolaCultivoRead = z.infer<typeof AgricolaCultivoSchema>;
export type TAgricolaCultivoRow = {
  id: number,
  worker: z.infer<typeof AgricolaSchema>,
  crop: z.infer<typeof CropSchema>,
}
export const agricolaCultivoValidationSchema = z.object({
	worker: selectFieldSchema, // Cambiado a número según el nuevo formato
	crop: selectFieldSchema, // Cambiado a número según el nuevo formato
});

export const agricolaCultivoCreateValidationSchema = z.object({
	worker: selectFieldSchema, // Cambiado a número según el nuevo formato
});

export type TAgricolaCultivoFields = z.infer<typeof agricolaCultivoValidationSchema>;
export type TAgricolaCultivoErrors = {
	worker?: string;
	crop?: string;
	root?: string;
};
export type TAgricolaCultivoFormActionState = {
	id?: number;
	toast?: TToastForm;
	fields?: TAgricolaCultivoFields;
	errors?: TAgricolaCultivoErrors;
	type?: "created" | "edited" | "error";
	agricolaCultivo?: TAgricolaCultivoFields;
};
export type TAgricolaCultivoDeleteActionState = {
	id: number;
	toast?: TToastForm;
	type?: "deleted" | "default" | "error";
};


// Trabajador Schemas
export const trabajadorValidation = z.object({
	worker: selectFieldSchema, // Cambiado a número según el nuevo formato

});
export type TTrabajadorFields = z.infer<typeof trabajadorValidation>;
export type TTrabajadorErrors = {
	worker?: string;
	root?: string;
};
export type TTrabajadorActionState = {
	crop: number,
	toast?: TToastForm;
	fields?: TTrabajadorFields;
	errors?: TTrabajadorErrors;
	type?: "created" | "error";
	agricolaCultivo?: TAgricolaCultivoRead;
};

