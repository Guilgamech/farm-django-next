"use server"
import settings from "@/settings";
import { apiFetch } from "./fetch";
import { TCultivo, TCultivoFields, TCultivoRead } from "@/schema/cultivo.schema";

// List Cultivo
export const list = async ({ access }: { access: string }) => {
  let response = await apiFetch({
    endpoint: "/cultivos/",
    access,
    method: "GET",
  });
  if (response.type === "success") {
    return response.data as TCultivoRead[];
  } else {
    return [] as TCultivoRead[];
  }
};

// Create Cultivo
export const create = async ({ access, data }: { access: string; data: TCultivoFields }) => {
  return await apiFetch({
    endpoint: "/cultivos/",
    access,
    method: "POST",
    data: {
      ...data,
      type: Number(data.type),
      manager: Number(data.manager),
    }
  });
};

// Update Cultivo
export const update = async ({ access, values: { id, data } }: { access: string; values: { id: number; data: TCultivoFields } }) => {
    return await apiFetch({
    endpoint: `/cultivos/${id}/`,
    access,
    method: "PUT",
    data: {
      ...data,
      type: Number(data.type),
      manager: Number(data.manager),
    }
  });

};

// Delete Cultivo
export const destroy = async ({ access, id }: { access: string; id: number }) => {
  return await apiFetch({
    endpoint: `/cultivos/${id}/`,
    access,
    method: "DELETE"
  });

};
