"use server";
import {
	enfermedadCultivoValidationSchema,
	cureValidation,
	diseaseValidation,
	TEnfermedadCultivoDeleteActionState,
	TEnfermedadCultivoRead,
	TCureActionState,
	TDiseaseActionState,
} from "@/schema/enfermedadcultivo.schema";
import * as apiEnfermedadCultivo from "@/lib/enfermedad-cultivo.api"; // Importa el API adecuado para Cultivo
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";

// Acción para eliminar un cultivo
export const enfermedadCultivoDeleteAction = async (prevState: TEnfermedadCultivoDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiEnfermedadCultivo.destroy({ access: session.access, id });
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

export const diseaseAction = async (prevState: TDiseaseActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await diseaseValidation.safeParseAsync(formData);
	prevState = {
		...prevState,
		fields: {
			disease: (formData["disease"] as string) ?? "",
			treatment: (formData["disease"] as string) ?? "",
			manager: (formData["disease"] as string) ?? "",
			grade: (formData["disease"] as string) ?? "",
			start: (formData["start"] as string) ?? "",
		},
		toast: { title: "Error", message: "Operación realizada incorrectamente", type: "error" },
		enfermedadCultivo: undefined,
	};
	const session = await getSession();
	if (session?.access) {
		if (parsed.success) {
			const result = await apiEnfermedadCultivo.create({
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
						disease: "",
						treatment: "",
						manager: "",
						grade: "",
						start: "",
					},
					enfermedadCultivo: result.data as TEnfermedadCultivoRead,
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

export const cureAction = async (prevState: TCureActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await cureValidation.safeParseAsync(formData);
	prevState = {
		...prevState,

		fields: {
			end: (formData["end"] as string) ?? "",
		},

		toast: { title: "Error", message: "Operación realizada incorrectamente", type: "error" },
		enfermedadCultivo: undefined,
	};
	const session = await getSession();
	if (session?.access) {
		if (parsed.success) {
			const result = await apiEnfermedadCultivo.update({
				access: session.access,
				values: { id: prevState.id, data: { end: parsed.data.end, disease: prevState.disease, crop: prevState.crop } },
			});
			if (result.type === "success") {
				prevState = {
					...prevState,
					type: "edited",
					fields: {
						end: "",
					},
					enfermedadCultivo: result.data as TEnfermedadCultivoRead,
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
