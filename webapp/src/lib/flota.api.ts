"use server";

import settings from "@/settings";
import { apiFetch } from "./fetch";
import { TFlota, TFlotaFields, TFlotaRead } from "@/schema/flota.schema";

// List Flota
export const list = async ({ access }: { access: string }) => {
  let response = await apiFetch({
    endpoint: "/flota/",
    access,
    method: "GET",
  });
  if (response.type === "success") {
    return response.data as TFlotaRead[];
  } else {
    return "Unauthorized";
  }
};

// Create Flota
export const create = async ({ access, data }: { access: string; data: TFlotaFields }) => {
  let response = await apiFetch({
    endpoint: "/flota/",
    access,
    method: "POST",
    data: { ...data, type: Number(data.type), manager: Number(data.manager), area: Number(data.area) }
  });
  if (response.type === "success") {
    return response.data as TFlota;
  } else {
    return "Unauthorized";
  }
};

// Update Flota
export const update = async ({ access, values: { id, data } }: { access: string; values: { id: number; data: TFlotaFields } }) => {
  let response = await apiFetch({
    endpoint: `/flota/${id}/`,
    access,
    method: "PUT",
    data: { ...data, type: Number(data.type), manager: Number(data.manager), area: Number(data.area) }
  });
  if (response.type === "success") {
    return response.data as TFlota;
  } else {
    return "Unauthorized";
  }
};

// Delete Flota
export const destroy = async ({ access, id }: { access: string; id: number }) => {
  let response = await apiFetch({
    endpoint: `/flota/${id}/`,
    access,
    method: "DELETE"
  });
  return response.type === "success";
};
