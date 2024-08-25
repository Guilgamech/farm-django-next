"use server";
import { tipoflotaValidationSchema, TTipoFlota, TTipoFlotaDeleteActionState, TTipoFlotaFormActionState } from "@/schema/tipof.schema";
import * as apiTipoFlota from "@/lib/tipof.api";
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";
export const tipoflotaCreateEditAction = async (prevState: TTipoFlotaFormActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await tipoflotaValidationSchema.safeParseAsync(formData);
	//estado inicial por defecto
	prevState = {
		...prevState,
		type: prevState.id ? "edited" : "created",
		fields: {
			name: (formData["name"] as string) ?? "",
		},
		toast: { title: "Error", message: "Operación realizada icorrectamente", type: "error" },
		tipoflota: undefined,
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
				const result = await apiTipoFlota.update({ access: session.access, values: { id: prevState.id, data: { ...parsed.data } } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "edited",
						tipoflota: result.data as TTipoFlota,
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
				const result = await apiTipoFlota.create({ access: session.access, data: { ...parsed.data } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "created",
						fields: {
							name: "",
						},
						tipoflota: result.data as TTipoFlota,
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

export const tipoflotaDeleteAction = async (prevState: TTipoFlotaDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiTipoFlota.destroy({access:session.access, id});
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
