"use server";
import { tratamientoValidationSchema, TTratamiento, TTratamientoDeleteActionState, TTratamientoFormActionState } from "@/schema/tratamiento.schema";
import * as apiTratamiento from "@/lib/tratamiento.api";
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";
export const tratamientoCreateEditAction = async (prevState: TTratamientoFormActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await tratamientoValidationSchema.safeParseAsync(formData);
	//estado inicial por defecto
	prevState = {
		...prevState,
		type: prevState.id ? "edited" : "created",

    fields: {
      name: (formData["name"] as string) ?? "",
      treatment: (formData["treatment"] as string) ?? "",
      disease: (formData["disease"] as string) ?? "",
    },
		toast: { title: "Error", message: "Operación realizada icorrectamente", type: "error" },
		tratamiento: undefined,
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
				const result = await apiTratamiento.update({ access: session.access, values: { id: prevState.id, data: { ...parsed.data } } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "edited",
						tratamiento: result.data as TTratamiento,
						toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
					};
        } else {
          const responseError = result.data as Record<string, string | string[]>          
          prevState = {
						...prevState,
						type: "error",
						errors: parseErrors(responseError),
					};
        }
			} else {
				const result = await apiTratamiento.create({ access: session.access, data: { ...parsed.data } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "created",

            fields: {
              treatment: "",
              name: "",
              disease: "",
            },
						tratamiento: result.data as TTratamiento,
						toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
					};
        }else {
          const responseError = result.data as Record<string, string | string[]>
          prevState = {
						...prevState,
						type: "error",
						errors: parseErrors(responseError),
					};
        }
			}
		} else {
			const formErrors = parsed.error.formErrors.fieldErrors;
			const errors = {
        name: formErrors.name?.join(", "),
        treatment: formErrors.treatment?.join(", "),
        disease: formErrors.disease?.join(", "),
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

export const tratamientoDeleteAction = async (prevState: TTratamientoDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiTratamiento.destroy({access:session.access, id});
    if(result.type === "success"){
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
