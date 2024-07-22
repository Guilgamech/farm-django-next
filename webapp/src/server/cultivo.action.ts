import { cultivoValidationSchema, TCultivoDeleteActionState, TCultivoFormActionState } from "@/schema/cultivo.schema";
import * as apiCultivo from "@/lib/cultivo.api"; // Importa el API adecuado para Cultivo
import { getSession } from "@/lib/session";

// Acción para crear o editar un cultivo
export const cultivoCreateEditAction = async (prevState: TCultivoFormActionState, data: FormData) => {
  const formData = Object.fromEntries(data);
  console.log(formData);
  const parsed = await cultivoValidationSchema.safeParseAsync(formData);

  // Estado inicial por defecto
  prevState = {
    ...prevState,
    type: prevState.id ? "edited" : "created",
    fields: {
      code: (formData["code"] as string) ?? "",
      name: (formData["name"] as string) ?? "",
      status: (formData["status"] as string) ?? "",
      type: (formData["type"] as string) ?? "",
      manager: (formData["manager"] as string) ?? "",
    },
    toast: { title: "Error", message: "Operación realizada incorrectamente", type: "error" },
    cultivo: undefined,
  };

  // Obtener access token
  const session = await getSession();
  if (session?.access) {
    // Datos correctamente validados
    if (parsed.success) {
      // Si el estado contiene un id es porque es para realizar una actualización
      const isEditAction = typeof prevState.id !== "undefined";
      if (isEditAction && prevState.id !== undefined) {
        const result = await apiCultivo.update({ access: session.access, values: { id: prevState.id, data: { ...parsed.data } } });
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
            cultivo: result,
            toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
          };
        }
      } else {
        const result = await apiCultivo.create({ access: session.access, data: { 
          ...parsed.data,
        } });
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
              status: "",
              type: "",
              manager: "",
            },
            cultivo: result,
            toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
          };
        }
      }
    } else {
      const formErrors = parsed.error.formErrors.fieldErrors;
      const errors = {
        code: formErrors.code?.join(", "),
        name: formErrors.name?.join(", "),
        status: formErrors.status?.join(", "),
        type: formErrors.type?.join(", "),
        manager: formErrors.manager?.join(", "),
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

// Acción para eliminar un cultivo
export const cultivoDeleteAction = async (prevState: TCultivoDeleteActionState, data: FormData) => {
  const id = prevState.id;
  const session = await getSession();
  if (session?.access) {
    const result = await apiCultivo.destroy({ access: session.access, id });
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
