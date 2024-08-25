"use server";
import { apiFetch } from "./fetch";
import { TArea, TAreaFields } from "@/schema/area.schema";

export const list = async ({ access }: { access: string }) => {
	let response = await apiFetch({
		endpoint: "/areas/",
		access,
		method: "GET",
	});
  if ( response.type === "success"){
    return response.data as TArea[]
  }else{
    return [] as TArea[]
  }
};

export const create = async ({ access, data }: { access: string; data: TAreaFields }) => {
	return await apiFetch({
		endpoint: "/areas/",
		access,
		method: "POST",
		data: { ...data, total_area: Number(data.total_area) },
	});
};
export const update = async ({ access, values: { id, data } }: { access: string; values: { id: number; data: TAreaFields } }) => {
	return await apiFetch({
		endpoint: `/areas/${id}/`,
		access,
		method: "PUT",
		data: { ...data, total_area: Number(data.total_area) },
	});
};

export const destroy = async ({ access, id }: { access: string; id: number }) => {
	return await apiFetch({
		endpoint: `/areas/${id}/`,
		access,
		method: "DELETE",
	});
};
