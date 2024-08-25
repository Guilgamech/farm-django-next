"use server";
import { incidenciaValidationSchema, TIncidencia, TIncidenciaDeleteActionState, TIncidenciaFormActionState } from "@/schema/incidencia.schema";
import * as apiIncidencia from "@/lib/incidencia.api";
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";
export const incidenciaCreateEditAction = async (prevState: TIncidenciaFormActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await incidenciaValidationSchema.safeParseAsync(formData);
	//estado inicial por defecto
	prevState = {
		...prevState,
		type: prevState.id ? "edited" : "created",
    fields: {
      type: (formData["type"] as string) ?? "",
      date: (formData["status"] as string) ?? "",
      status: (formData["status"] as string) ?? "",
      damage: (formData["damage"] as string) ?? "",
      area: (formData["area"] as string) ?? "",
},

		toast: { title: "Error", message: "Operación realizada icorrectamente", type: "error" },
		incidencia: undefined,
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
				const result = await apiIncidencia.update({ access: session.access, values: { id: prevState.id, data: { ...parsed.data } } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "edited",
						incidencia: result.data as TIncidencia,
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
				const result = await apiIncidencia.create({ access: session.access, data: { ...parsed.data } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "created",
            fields: {
              type: "",
              date: "",
              status: "",
              damage: "",
              area: "",
      },
						incidencia: result.data as TIncidencia,
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

        type: formErrors.type?.join(", "),
        date: formErrors.date?.join(", "),
        status: formErrors.status?.join(", "),
        damage: formErrors.damage?.join(", "),
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

export const incidenciaDeleteAction = async (prevState: TIncidenciaDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiIncidencia.destroy({access:session.access, id});
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
