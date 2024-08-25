"use server";
import { agricolaValidationSchema, TAgricola, TAgricolaDeleteActionState, TAgricolaFormActionState } from "@/schema/agricola.schema";
import * as apiAgricola from "@/lib/agricola.api";
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";
export const agricolaCreateEditAction = async (prevState: TAgricolaFormActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await agricolaValidationSchema.safeParseAsync(formData);
	//estado inicial por defecto
	prevState = {
		...prevState,
		type: prevState.trabajador_id ? "edited" : "created",
    fields: {
      name: (formData["name"] as string) ?? "",
      ci: (formData["ci"] as string) ?? "",
      age: (formData["age"] as string) ?? "",
      direction: (formData["direction"] as string) ?? "",
      skill: (formData["skill"] as string) ?? "",
      area: (formData["area"] as string) ?? "",
    },
		toast: { title: "Error", message: "Operación realizada icorrectamente", type: "error" },
		agricola: undefined,
		//toast: { title: "Correcto", message:"Operación realizada correctamente", type:"success"}
	};
	//obtener access token
	const session = await getSession();
	if (session?.access) {
		//datos correctamente valtrabajador_idados
		if (parsed.success) {
			//si el estado contiene un trabajador_id es porq es para realizar una actualizacion
			const isEditAction = typeof prevState.trabajador_id !== "undefined";
			if (isEditAction && prevState.trabajador_id !== undefined) {
				const result = await apiAgricola.update({ access: session.access, values: { trabajador_id: prevState.trabajador_id, data: { ...parsed.data } } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "edited",
						agricola: result.data as TAgricola,
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
				const result = await apiAgricola.create({ access: session.access, data: { ...parsed.data } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "created",
            fields: {
              name: "",
              ci: "",
              age: "",
              direction: "",
              skill: "",
              area: "", 
          },
						agricola: result.data as TAgricola,
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
        ci: formErrors.ci?.join(", "),
        age: formErrors.age?.join(", "),
        direction: formErrors.direction?.join(", "),
        skill: formErrors.skill?.join(", "),
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

export const agricolaDeleteAction = async (prevState: TAgricolaDeleteActionState, data: FormData) => {
	const trabajador_id = prevState.trabajador_id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiAgricola.destroy({access:session.access, trabajador_id});
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
