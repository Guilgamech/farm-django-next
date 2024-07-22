"use server";

import { flotaValidationSchema, TFlotaDeleteActionState, TFlotaFormActionState } from "@/schema/flota.schema";
import * as apiFlota from "@/lib/flota.api"; // Importa el API adecuado para Flota
import { getSession } from "@/lib/session";

// Acción para crear o editar una flota
export const flotaCreateEditAction = async (prevState: TFlotaFormActionState, data: FormData) => {
  const formData = Object.fromEntries(data);
  console.log(formData);
  const parsed = await flotaValidationSchema.safeParseAsync(formData);

  // Estado inicial por defecto
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
    toast: { title: "Error", message: "Operación realizada incorrectamente", type: "error" },
    flota: undefined,
  };

  // Obtener access token
  const session = await getSession();
  if (session?.access) {
    // Datos correctamente validados
    if (parsed.success) {
      // Si el estado contiene un id es porque es para realizar una actualización
      const isEditAction = typeof prevState.id !== "undefined";
      if (isEditAction && prevState.id !== undefined) {
        const result = await apiFlota.update({ access: session.access, values: { id: prevState.id, data: { ...parsed.data } } });
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
            flota: result,
            toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
          };
        }
      } else {
        const result = await apiFlota.create({ access: session.access, data: { 
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
              status: "",
              type: "",
              manager: "",
              area: "",
            },
            flota: result,
            toast: { title: "Correcto", message: "Operación realizada correctamente", type: "success" },
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

// Acción para eliminar una flota
export const flotaDeleteAction = async (prevState: TFlotaDeleteActionState, data: FormData) => {
  const id = prevState.id;
  const session = await getSession();
  if (session?.access) {
    const result = await apiFlota.destroy({ access: session.access, id });
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
