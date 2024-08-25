import { z } from "zod";
import { selectFieldSchema, TToastForm } from "./utils";

const AreaSchema = z.object({
	id: z.number(),
	code: z.string(),
	name: z.string(),
	total_area: z.number(),
});
export type TAreaCultivoSchemaArea = z.infer<typeof AreaSchema>;
const CropSchema = z.object({
	id: z.number(),
	code: z.string(),
	name: z.string(),
	status: z.string(), // Puedes usar un enum si los valores son fijos
	type: z.number(),
	manager: z.number(),
});

export type TAreaCultivoSchemaCultivo = z.infer<typeof CropSchema>;

const AreaCultivoSchema = z.object({
	id: z.number(),
	area: AreaSchema,
	crop: CropSchema,
	date_planted: z
		.string()
		.refine((date) => !isNaN(Date.parse(date)), {
			message: "Invalid date format",
		})
		.optional(),
    date_harved: z
		.string()
		.refine((date) => !isNaN(Date.parse(date)), {
			message: "Invalid date format",
		})
		.optional(),
});
export type TAreaCultivoRead = z.infer<typeof AreaCultivoSchema>;
export type TAreaCultivoRow = {
  id: number,
  area: z.infer<typeof AreaSchema>,
  crop: z.infer<typeof CropSchema>,
  date_planted: Date | null,
  date_harved: Date | null
}
export const areaCultivoValidationSchema = z.object({
	area: selectFieldSchema, // Cambiado a número según el nuevo formato
	crop: selectFieldSchema, // Cambiado a número según el nuevo formato
	date_planted: z.string().refine((date) => date.length > 1 ? !isNaN(Date.parse(date)) : false, {
		message: "Selccione una fecha correcta",
	}).optional(),
	date_harved: z.string().refine((date) => date.length > 1 ? !isNaN(Date.parse(date)) : false, {
		message: "Selccione una fecha correcta",
	}).optional(),
});
export const areaCultivoCreateValidationSchema = z.object({
	area: selectFieldSchema, // Cambiado a número según el nuevo formato
	date_planted: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
	date_harved: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
});

export type TAreaCultivoFields = z.infer<typeof areaCultivoValidationSchema>;
export type TAreaCultivoErrors = {
	area?: string;
	crop?: string;
	date_planted?: string;
	date_harved?: string;
	root?: string;
};
export type TAreaCultivoFormActionState = {
	id?: number;
	toast?: TToastForm;
	fields?: TAreaCultivoFields;
	errors?: TAreaCultivoErrors;
	type?: "created" | "edited" | "error";
	areaCultivo?: TAreaCultivoFields;
};
export type TAreaCultivoDeleteActionState = {
	id: number;
	toast?: TToastForm;
	type?: "deleted" | "default" | "error";
};

// Seed Schemas
export const seedValidation = z.object({
	area: selectFieldSchema, // Cambiado a número según el nuevo formato
	date_planted: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Selccione una fecha correcta",
	}),
});
export type TSeedFields = z.infer<typeof seedValidation>;
export type TSeedErrors = {
	area?: string;
	date_planted?: string;
	root?: string;
};
export type TSeedActionState = {
	crop: number,
	toast?: TToastForm;
	fields?: TSeedFields;
	errors?: TSeedErrors;
	type?: "created" | "error";
	areaCultivo?: TAreaCultivoRead;
};



export const harvestValidation = z.object({
	date_harved: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Selccione una fecha correcta",
	})
});

export type THarvestFields = z.infer<typeof harvestValidation>;
export type THarvestErrors = {
	date_harved?: string;
	root?: string;
};
export type THarvestActionState = {
	id: number,
  area: number,
  crop: number,
	toast?: TToastForm;
	fields?: THarvestFields;
	errors?: THarvestErrors;
	type?: "edited" | "error";
	areaCultivo?: TAreaCultivoRead;
};
