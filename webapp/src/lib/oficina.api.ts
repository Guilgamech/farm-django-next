"use server";

import settings from "@/settings";
import { apiFetch } from "./fetch";
import { TOficina, TOficinaFields, TOficinaRead } from "@/schema/oficina.schema";

// List Oficina
export const list = async ({ access }: { access: string }) => {
  let response = await apiFetch({
    endpoint: "/oficina/",
    access,
    method: "GET",
  });
  if (response.type === "success") {
    return response.data as TOficinaRead[];
  } else {
    return [] as TOficinaRead[];
  }
};

// Create Oficina
export const create = async ({ access, data }: { access: string; data: TOficinaFields }) => {
  return await apiFetch({
    endpoint: "/oficina/",
    access,
    method: "POST",
    data: { ...data, rol: Number(data.rol), area: Number(data.area) }
  });

};

// Update Oficina
export const update = async ({ access, values: { trabajador_id, data } }: { access: string; values: { trabajador_id: number; data: TOficinaFields } }) => {
  return await apiFetch({
    endpoint: `/oficina/${trabajador_id}/`,
    access,
    method: "PUT",
    data: { ...data, rol: Number(data.rol), area: Number(data.area) }
  });

};

// Delete Oficina
export const destroy = async ({ access, trabajador_id }: { access: string; trabajador_id: number }) => {
  return await apiFetch({
    endpoint: `/oficina/${trabajador_id}/`,
    access,
    method: "DELETE"
  });
};
