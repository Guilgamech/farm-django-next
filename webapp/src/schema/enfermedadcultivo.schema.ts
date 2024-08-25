import { string, z } from "zod";
import { basicString, selectFieldSchema, TToastForm } from "./utils";

const EnfermedadSchema = z.object({
	id: z.number(),
	type_crops: z.number(),
	name: z.string(),
	category: z.string(),
});
export type TEnfermedadCultivoSchemaEnfermedad = z.infer<typeof EnfermedadSchema>;

const CropSchema = z.object({
	id: z.number(),
	code: z.string(),
	name: z.string(),
	status: z.string(), // Puedes usar un enum si los valores son fijos
	type: z.number(),
	manager: z.number(),
});

export type TEnfermedadCultivoSchemaCultivo = z.infer<typeof CropSchema>;

const TratamientoSchema = z.object({
	id: z.number(),
	treatment: z.string(),
	name: z.string(),
	disease: z.number(),
});

export type TTratamientoCultivoSchemaTratamiento = z.infer<typeof TratamientoSchema>;

const TrabajadorSchema = z.object({
	id: z.number(),
	treatment: z.string(),
	name: z.string(),
	disease: z.number(),
});

export type TTrabajadorCultivoSchemaTrabajador = z.infer<typeof TrabajadorSchema>;

const EnfermedadCultivoSchema = z.object({
	id: z.number(),
	disease: EnfermedadSchema,
	treatment: TratamientoSchema,
	crop: CropSchema,
    manager: TrabajadorSchema,
	start: z
		.string()
		.refine((date) => !isNaN(Date.parse(date)), {
			message: "Invalid date format",
		})
		.optional(),
    end: z
		.string()
		.refine((date) => !isNaN(Date.parse(date)), {
			message: "Invalid date format",
		})
		.optional(),
	grade: z.string(),

});
export type TEnfermedadCultivoRead = z.infer<typeof EnfermedadCultivoSchema>;
export type TEnfermedadCultivoRow = {
  id: number,
  disease: z.infer<typeof EnfermedadSchema>,
  crop: z.infer<typeof CropSchema>,
  treatment: z.infer<typeof TratamientoSchema>,
  manager: z.infer<typeof TrabajadorSchema>,
  start: Date | null,
  end: Date | null,
  grade: string
}
export const enfermedadCultivoValidationSchema = z.object({
	disease: selectFieldSchema, // Cambiado a número según el nuevo formato
	treatment: selectFieldSchema, // Cambiado a número según el nuevo formato
	crop: selectFieldSchema, // Cambiado a número según el nuevo formato
	manager: selectFieldSchema, // Cambiado a número según el nuevo formato
	start: z.string().refine((date) => date.length > 1 ? !isNaN(Date.parse(date)) : false, {
		message: "Selccione una fecha correcta",
	}).optional(),
	end: z.string().refine((date) => date.length > 1 ? !isNaN(Date.parse(date)) : false, {
		message: "Selccione una fecha correcta",
	}).optional(),
    grade: basicString

});

export const enfermdeadCultivoCreateValidationSchema = z.object({
	disease: selectFieldSchema, // Cambiado a número según el nuevo formato
	treatment: selectFieldSchema, // Cambiado a número según el nuevo formato
	manager: selectFieldSchema, // Cambiado a número según el nuevo formato
	start: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
	end: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
    grade: basicString,
});

export type TEnfermedadCultivoFields = z.infer<typeof enfermedadCultivoValidationSchema>;
export type TEnfermedadCultivoErrors = {
	disease?: string;
	crop?: string;
	manager?: string;
	treatment?: string;
	start?: string;
	end?: string;
	grade?: string;
	root?: string;
};
export type TEnfermedadCultivoFormActionState = {
	id?: number;
	toast?: TToastForm;
	fields?: TEnfermedadCultivoFields;
	errors?: TEnfermedadCultivoErrors;
	type?: "created" | "edited" | "error";
	enfermedadCultivo?: TEnfermedadCultivoFields;
};
export type TEnfermedadCultivoDeleteActionState = {
	id: number;
	toast?: TToastForm;
	type?: "deleted" | "default" | "error";
};

// Disease Schemas
export const diseaseValidation = z.object({
	disease: selectFieldSchema, // Cambiado a número según el nuevo formato
	treatment: selectFieldSchema, // Cambiado a número según el nuevo formato
	manager: selectFieldSchema, // Cambiado a número según el nuevo formato
	start: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid date format",
	}),
    grade: basicString,
});
export type TDiseaseFields = z.infer<typeof diseaseValidation>;
export type TDiseaseErrors = {
	disease?: string;
	treatment?: string;
	manager?: string;
	start?: string;
	grade?: string;
	root?: string;
};
export type TDiseaseActionState = {
	crop: number,
	toast?: TToastForm;
	fields?: TDiseaseFields;
	errors?: TDiseaseErrors;
	type?: "created" | "error";
	enfermedadCultivo?: TEnfermedadCultivoRead;
};



export const cureValidation = z.object({
	end: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Selccione una fecha correcta",
	})
});

export type TCureFields = z.infer<typeof cureValidation>;
export type TCureErrors = {
	end?: string;
	root?: string;
};
export type TCureActionState = {
	id: number,
    disease: number,
    crop: number,
	toast?: TToastForm;
	fields?: TCureFields;
	errors?: TCureErrors;
	type?: "edited" | "error";
	enfermedadCultivo?: TEnfermedadCultivoRead;
};
