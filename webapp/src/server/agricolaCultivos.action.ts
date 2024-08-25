"use server";
import {
    trabajadorValidation,
    TTrabajadorActionState,
	TAgricolaCultivoDeleteActionState,
	TAgricolaCultivoRead,
} from "@/schema/agricolacultivo.schema";
import * as apiAgricolaCultivo from "@/lib/agricola-cultivo.api"; // Importa el API adecuado para Cultivo
import { getSession } from "@/lib/session";

// Acción para eliminar un cultivo
export const agricolaCultivoDeleteAction = async (prevState: TAgricolaCultivoDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiAgricolaCultivo.destroy({ access: session.access, id });
		if (result) {
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

export const trabajadorAction = async (prevState: TTrabajadorActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await trabajadorValidation.safeParseAsync(formData);
	prevState = {
		...prevState,
		fields: {
			worker: (formData["agricola"] as string) ?? "",
		},
		toast: { title: "Error", message: "Operación realizada incorrectamente", type: "error" },
		agricolaCultivo: undefined,
	};
	const session = await getSession();
	if (session?.access) {
		if (parsed.success) {
			const result = await apiAgricolaCultivo.create({
				access: session.access,
				data: {
					...parsed.data,
					crop: String(prevState.crop),
				},
			});
			if (result.type === "success") {
				prevState = {
					...prevState,
					type: "error",
					errors: { root: "No está autorizado" },
				};
			} else {
				prevState = {
					...prevState,
					type: "created",
					fields: {
						worker: "",
					},
					agricolaCultivo: result.data as TAgricolaCultivoRead,
					toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
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


