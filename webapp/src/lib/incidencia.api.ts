import settings from "@/settings";
import { apiFetch } from "./fetch";
import { TIncidencia, TIncidenciaFields, TIncidenciaRead } from "@/schema/incidencia.schema";

export const list = async ({ access }: { access: string }) => {
  let response = await apiFetch({
    endpoint: "/incidencias/",
    access,
    method: "GET",
  });
  if (response.type === "success") {
    return response.data as TIncidenciaRead[];
  } else {
    return [] as TIncidenciaRead[];
  }
};

export const create = async ({
  access,
  data,
}: {
  access: string;
  data: TIncidenciaFields;
}) => {
  return await apiFetch({
    endpoint: "/incidencias/",
    access,
    method: "POST",
    data: { ...data, area: Number(data.area) },
  });

};

export const update = async ({
  access,
  values: { id, data },
}: {
  access: string;
  values: { id: number; data: TIncidenciaFields };
}) => {
  return await apiFetch({
    endpoint: `/incidencias/${id}/`,
    access,
    method: "PUT",
    data: { ...data, area: Number(data.area) },
  });
};

export const destroy = async ({
  access,
  id,
}: {
  access: string;
  id: number;
}) => {
  return await apiFetch({
    endpoint: `/incidencias/${id}/`,
    access,
    method: "DELETE",
  });
};
