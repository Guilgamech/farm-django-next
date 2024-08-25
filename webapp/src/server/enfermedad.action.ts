"use server";
import { enfermedadValidationSchema, TEnfermedad, TEnfermedadDeleteActionState, TEnfermedadFormActionState } from "@/schema/enfermedad.schema";
import * as apiEnfermedad from "@/lib/enfermedad.api";
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";
export const enfermedadCreateEditAction = async (prevState: TEnfermedadFormActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await enfermedadValidationSchema.safeParseAsync(formData);
	//estado inicial por defecto
	prevState = {
		...prevState,
		type: prevState.id ? "edited" : "created",
    fields: {
      name: (formData["name"] as string) ?? "",
      category: (formData["category"] as string) ?? "",
      type_crops: (formData["type_crops"] as string) ?? "",
    },
    
		toast: { title: "Error", message: "Operación realizada icorrectamente", type: "error" },
		enfermedad: undefined,
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
				const result = await apiEnfermedad.update({ access: session.access, values: { id: prevState.id, data: { ...parsed.data } } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "edited",
						enfermedad: result.data as TEnfermedad,
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
				const result = await apiEnfermedad.create({ access: session.access, data: { ...parsed.data } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "created",
            fields: {
              category: "",
              name: "",
              type_crops: "",
            },
						enfermedad: result.data as TEnfermedad,
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
        category: formErrors.category?.join(", "),
        type_crops: formErrors.type_crops?.join(", "),
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

export const enfermedadDeleteAction = async (prevState: TEnfermedadDeleteActionState, data: FormData) => {
	const id = prevState.id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiEnfermedad.destroy({access:session.access, id});
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






