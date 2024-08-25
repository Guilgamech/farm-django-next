"use server";
import {
	areaCultivoValidationSchema,
	harvestValidation,
	seedValidation,
	TAreaCultivoDeleteActionState,
	TAreaCultivoRead,
	THarvestActionState,
	TSeedActionState,
} from "@/schema/areacultivo.schema";
import * as apiAreaCultivo from "@/lib/area-cultivo.api"; // Importa el API adecuado para Cultivo
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";

// Acción para eliminar un cultivo
export const areaCultivoDeleteAction = async (prevState: TAreaCultivoDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiAreaCultivo.destroy({ access: session.access, id });
		if (result.type === "success") {
			prevState = {
				...prevState,
				type: "deleted",
				toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
			};
		} else {
			prevState = {
				...prevState,
				type: "error",
				toast: { title: "Error", message: "Operación realizada incorrectamente", type: "error" },
			};
		}
	} else {
		prevState = {
			...prevState,
			type: "default",
			toast: { title: "Error", message: "No está autorizado", type: "error" },
		};
	}
	return prevState;
};

export const seedAction = async (prevState: TSeedActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await seedValidation.safeParseAsync(formData);
	prevState = {
		...prevState,
		fields: {
			area: (formData["area"] as string) ?? "",
			date_planted: (formData["date_planted"] as string) ?? "",
		},
		toast: { title: "Error", message: "Operación realizada incorrectamente", type: "error" },
		areaCultivo: undefined,
	};
	const session = await getSession();
	if (session?.access) {
		if (parsed.success) {
			const result = await apiAreaCultivo.create({
				access: session.access,
				data: {
					...parsed.data,
					crop: String(prevState.crop),
				},
			});
			if (result.type === "success") {
				prevState = {
					...prevState,
					type: "created",
					fields: {
						area: "",
						date_planted: "",
					},
					areaCultivo: result.data as TAreaCultivoRead,
					toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
				};
			} else {
				const responseError = result.data as Record<string, string | string[]>;
				prevState = {
					...prevState,
					type: "error",
					errors: parseErrors(responseError),
				};
			}
		}
	} else {
		prevState = {
			...prevState,
			type: "error",
			errors: { root: "No está autorizado" },
		};
	}
	return prevState;
};

export const harvestAction = async (prevState: THarvestActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await harvestValidation.safeParseAsync(formData);
	prevState = {
		...prevState,
		fields: {
			date_harved: (formData["date_harved"] as string) ?? "",
		},
		toast: { title: "Error", message: "Operación realizada incorrectamente", type: "error" },
		areaCultivo: undefined,
	};
	const session = await getSession();
	if (session?.access) {
		if (parsed.success) {
			const result = await apiAreaCultivo.update({
				access: session.access,
				values: { id: prevState.id, data: { date_harved: parsed.data.date_harved, area: prevState.area, crop: prevState.crop } },
			});
			if (result.type === "success") {
				prevState = {
					...prevState,
					type: "edited",
					fields: {
						date_harved: "",
					},
					areaCultivo: result.data as TAreaCultivoRead,
					toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
				};
			}else{
        const responseError = result.data as Record<string, string | string[]>;
				prevState = {
					...prevState,
					type: "error",
					errors: parseErrors(responseError),
				};
      }
		}
	} else {
		prevState = {
			...prevState,
			type: "error",
			errors: { root: "No está autorizado" },
		};
	}
	return prevState;
};
