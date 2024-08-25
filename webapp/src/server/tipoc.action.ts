"use server";
import { tipocultivoValidationSchema, TTipoCultivo, TTipoCultivoDeleteActionState, TTipoCultivoFormActionState } from "@/schema/tipoc.schema";
import * as apiTipoCultivo from "@/lib/tipoc.api";
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";
export const tipocultivoCreateEditAction = async (prevState: TTipoCultivoFormActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await tipocultivoValidationSchema.safeParseAsync(formData);
	//estado inicial por defecto
	prevState = {
		...prevState,
		type: prevState.id ? "edited" : "created",
		fields: {
			name: (formData["name"] as string) ?? "",
		},
		toast: { title: "Error", message: "Operación realizada icorrectamente", type: "error" },
		tipocultivo: undefined,
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
				const result = await apiTipoCultivo.update({ access: session.access, values: { id: prevState.id, data: { ...parsed.data } } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "edited",
						tipocultivo: result.data as TTipoCultivo,
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
				const result = await apiTipoCultivo.create({ access: session.access, data: { ...parsed.data } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "created",
						fields: {
							name: "",
						},
						tipocultivo: result.data as TTipoCultivo,
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

export const tipocultivoDeleteAction = async (prevState: TTipoCultivoDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiTipoCultivo.destroy({access:session.access, id});
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
