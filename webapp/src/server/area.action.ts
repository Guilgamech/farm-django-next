"use server";
import { areaValidationSchema, TAreaDeleteActionState, TAreaFormActionState } from "@/schema/area.schema";
import * as apiArea from "@/lib/area.api";
import { getSession } from "@/lib/session";
export const areaCreateEditAction = async (prevState: TAreaFormActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await areaValidationSchema.safeParseAsync(formData);
	//estado inicial por defecto
	prevState = {
		...prevState,
		type: prevState.id ? "edited" : "created",
		fields: {
			code: (formData["code"] as string) ?? "",
			name: (formData["name"] as string) ?? "",
			total_area: (formData["total_area"] as string) ?? "",
		},
		toast: { title: "Error", message: "Operación realizada icorrectamente", type: "error" },
		area: undefined,
		//toast: { title: "Correcto", message:"Operación realizada correctamente", type:"success"}
	};
	//obtener access token
	const session = await getSession();
	if (session?.access) {
		//datos correctamente validados
		if (parsed.success) {
			//si el estado contiene un id es porq es para realizar una actualizacion
			const isEditAction = typeof prevState.id !== "undefined";
			if (isEditAction && prevState.id !== undefined) {
				const result = await apiArea.update({ access: session.access, values: { id: prevState.id, data: { ...parsed.data } } });
				if (result === "Unauthorized") {
					prevState = {
						...prevState,
						type: "error",
						errors: { root: "No está autorizado" },
					};
				} else {
					prevState = {
						...prevState,
						type: "edited",
						area: result,
						toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
					};
				}
			} else {
				const result = await apiArea.create({ access: session.access, data: { ...parsed.data } });
				if (result === "Unauthorized") {
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
							code: "",
							name: "",
							total_area: "",
						},
						area: result,
						toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
					};
				}
			}
		} else {
			const formErrors = parsed.error.formErrors.fieldErrors;
			const errors = {
				code: formErrors.code?.join(", "),
				name: formErrors.name?.join(", "),
				total_area: formErrors.total_area?.join(", "),
				root: "Corrige los errores",
			};
			prevState = { ...prevState, type: "error", errors };
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

export const areaDeleteAction = async (prevState: TAreaDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiArea.destroy({access:session.access, id});
    if(result){
      prevState = {
        ...prevState,
        type:"deleted",
        toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
      }
    }else{
      prevState = {
        ...prevState,
        type:"error",
        toast: { title: "Error", message: "Operación realizada incorrectamente", type: "error" },
      }
    }
	}else{
    prevState = {
      ...prevState,
      type:"default",
      toast: { title: "Error", message: "No está autorizado", type: "error" },
    }
  }
  return prevState;
};
