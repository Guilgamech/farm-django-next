"use server";
import { oficinaValidationSchema, TOficina, TOficinaDeleteActionState, TOficinaFormActionState } from "@/schema/oficina.schema";
import * as apiOficina from "@/lib/oficina.api";
import { getSession } from "@/lib/session";
import { parseErrors } from "@/lib/utils";
export const oficinaCreateEditAction = async (prevState: TOficinaFormActionState, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await oficinaValidationSchema.safeParseAsync(formData);
	//estado inicial por defecto
	prevState = {
		...prevState,
		type: prevState.trabajador_id ? "edited" : "created",
    fields: {
      name: (formData["name"] as string) ?? "",
      ci: (formData["ci"] as string) ?? "",
      age: (formData["age"] as string) ?? "",
      direction: (formData["direction"] as string) ?? "",
      username: (formData["username"] as string) ?? "",
      email: (formData["email"] as string) ?? "",
      password: (formData["password"] as string) ?? "",
      area: (formData["area"] as string) ?? "",
      rol: (formData["rol"] as string) ?? "",
    },
		toast: { title: "Error", message: "Operación realizada icorrectamente", type: "error" },
		oficina: undefined,
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
				const result = await apiOficina.update({ access: session.access, values: { trabajador_id: prevState.trabajador_id, data: { ...parsed.data } } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "edited",
						oficina: result.data as TOficina,
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
				const result = await apiOficina.create({ access: session.access, data: { ...parsed.data } });
        if (result.type === 'success'){
          prevState = {
						...prevState,
						type: "created",
            fields: {
              name: "",
              ci: "",
              age: "",
              direction: "",
              email: "",
              username: "",
              rol: "",
              password: "",
              area: "", 
          },
						oficina: result.data as TOficina,
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
        email: formErrors.email?.join(", "),
        username: formErrors.username?.join(", "),
        password: formErrors.username?.join(", "),
        rol: formErrors.username?.join(", "),
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

export const oficinaDeleteAction = async (prevState: TOficinaDeleteActionState, data: FormData) => {
	const trabajador_id = prevState.trabajador_id;
	const session = await getSession();
	if (session?.access) {
		const result = await apiOficina.destroy({access:session.access, trabajador_id});
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
