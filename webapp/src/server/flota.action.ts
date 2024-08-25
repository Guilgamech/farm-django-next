"use server";
import { flotaValidationSchema, TFlota, TFlotaDeleteActionState, TFlotaFormActionState } from "@/schema/flota.schema";
import * as apiFlota from "@/lib/flota.api";
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";
export const flotaCreateEditAction = async (prevState: TFlotaFormActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await flotaValidationSchema.safeParseAsync(formData);
	//estado inicial por defecto
	prevState = {
		...prevState,
		type: prevState.id ? "edited" : "created",
    fields: {
      code: (formData["code"] as string) ?? "",
      status: (formData["status"] as string) ?? "",
      type: (formData["type"] as string) ?? "",
      manager: (formData["manager"] as string) ?? "",
      area: (formData["area"] as string) ?? "",
    },
		toast: { title: "Error", message: "Operación realizada icorrectamente", type: "error" },
		flota: undefined,
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
				const result = await apiFlota.update({ access: session.access, values: { id: prevState.id, data: { ...parsed.data } } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "edited",
						flota: result.data as TFlota,
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
				const result = await apiFlota.create({ access: session.access, data: { ...parsed.data } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "created",
            fields: {
              code: "",
              status: "",
              type: "",
              manager: "",
              area: "",
            },
						flota: result.data as TFlota,
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

        code: formErrors.code?.join(", "),
        status: formErrors.status?.join(", "),
        type: formErrors.type?.join(", "),
        manager: formErrors.manager?.join(", "),
        area: formErrors.area?.join(", "),
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

export const flotaDeleteAction = async (prevState: TFlotaDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiFlota.destroy({access:session.access, id});
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
