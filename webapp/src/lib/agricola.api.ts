"use server";

import settings from "@/settings";
import { apiFetch } from "./fetch";
import { TAgricola, TAgricolaFields, TAgricolaRead } from "@/schema/agricola.schema";

// List Agricola
export const list = async ({ access }: { access: string }) => {
  let response = await apiFetch({
    endpoint: "/agricola/",
    access,
    method: "GET",
  });
  if (response.type === "success") {
    return response.data as TAgricolaRead[];
  } else {
    return [] as TAgricolaRead[];
  }
};

// Create Agricola
export const create = async ({ access, data }: { access: string; data: TAgricolaFields }) => {
  return await apiFetch({
    endpoint: "/agricola/",
    access,
    method: "POST",
    data: { ...data, area: Number(data.area) }
  });

};

// Update Agricola
export const update = async ({ access, values: { trabajador_id, data } }: { access: string; values: { trabajador_id: number; data: TAgricolaFields } }) => {
  return await apiFetch({
    endpoint: `/agricola/${trabajador_id}/`,
    access,
    method: "PUT",
    data: { ...data, area: Number(data.area) }
  });

};

// Delete Agricola
export const destroy = async ({ access, trabajador_id }: { access: string; trabajador_id: number }) => {
  return await apiFetch({
    endpoint: `/agricola/${trabajador_id}/`,
    access,
    method: "DELETE"
  });
};
