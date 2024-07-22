import settings from "@/settings";
import { apiFetch } from "./fetch";
import { TIncidencia, TIncidenciaFields } from "@/schema/incidencia.schema";

export const list = async ({ access }: { access: string }) => {
  let response = await apiFetch({
    endpoint: "/incidencias/",
    access,
    method: "GET",
  });
  if (response.type === "success") {
    return response.data as TIncidencia[];
  } else {
    return "Unauthorized";
  }
};

export const create = async ({
  access,
  data,
}: {
  access: string;
  data: TIncidenciaFields;
}) => {
  let response = await apiFetch({
    endpoint: "/incidencias/",
    access,
    method: "POST",
    data: { ...data, date: new Date(data.date).toISOString() },
  });
  if (response.type === "success") {
    return response.data as TIncidencia;
  } else {
    return "Unauthorized";
  }
};

export const update = async ({
  access,
  values: { id, data },
}: {
  access: string;
  values: { id: number; data: TIncidenciaFields };
}) => {
  let response = await apiFetch({
    endpoint: `/incidencias/${id}/`,
    access,
    method: "PUT",
    data: { ...data, date: new Date(data.date).toISOString() },
  });
  if (response.type === "success") {
    return response.data as TIncidencia;
  } else {
    return "Unauthorized";
  }
};

export const destroy = async ({
  access,
  id,
}: {
  access: string;
  id: number;
}) => {
  let response = await apiFetch({
    endpoint: `/incidencias/${id}/`,
    access,
    method: "DELETE",
  });
  return response.type === "success";
};
