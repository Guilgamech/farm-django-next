"use server";

import { TAgricolaCultivoRead, TAgricolaCultivoFields } from "@/schema/agricolacultivo.schema";
import { apiFetch } from "./fetch";

// List Agricola
export const list = async ({ access }: { access: string }) => {
	let response = await apiFetch({
		endpoint: "/agricolacultivo/",
		access,
		method: "GET",
	});
	if (response.type === "success") {
		return response.data as TAgricolaCultivoRead[];
	} else {
		return [] as TAgricolaCultivoRead[];
	}
};

// Create AgricolaCultivo
export const create = async ({ access, data }: { access: string; data: TAgricolaCultivoFields }) => {
	let response = await apiFetch({
		endpoint: "/agricolacultivo/",
		access,
		method: "POST",
		data: { ...data, worker: Number(data.worker), crop: Number(data.crop) },
	});
	if (response.type === "success") {
		const id = response.data.id ?? -1;
    if(id > 0){
      return await apiFetch({
        endpoint: `/agricolacultivo/${id}/`,
        access,
        method: "GET",
      });
    } else{
		return response
	  }
	} else{
	  return response
	}
};

export const update = async ({ access, values: { id, data } }: { access: string; values: { id: number; data: {crop: number, worker:number, date_harved: string} } }) => {
	let response = await apiFetch({
		endpoint: `/agricolacultivo/${id}/`,
		access,
		method: "PATCH",
		data
	});
	if (response.type === "success") {
		const id = response.data.id ?? -1;
    if(id > 0){
      return await apiFetch({
        endpoint: `/agricolacultivo/${id}/`,
        access,
        method: "GET",
      });
	} else{
		return response
	  }
	} else{
	  return response
	}
};

export const destroy = async ({ access, id }: { access: string; id: number }) => {
	return await apiFetch({
		endpoint: `/agricolacultivo/${id}/`,
		access,
		method: "DELETE",
	});
};
