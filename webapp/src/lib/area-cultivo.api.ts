"use server";

import { TAreaCultivoRead, TAreaCultivoFields, THarvestFields } from "@/schema/areacultivo.schema";
import { apiFetch } from "./fetch";

// List Agricola
export const list = async ({ access }: { access: string }) => {
	let response = await apiFetch({
		endpoint: "/areacultivo/",
		access,
		method: "GET",
	});
	if (response.type === "success") {
		return response.data as TAreaCultivoRead[];
	} else {
		return [] as TAreaCultivoRead[];
	}
};

// Create AreaCultivo
export const create = async ({ access, data }: { access: string; data: TAreaCultivoFields }) => {
	let response =  await apiFetch({
		endpoint: "/areacultivo/",
		access,
		method: "POST",
		data: { ...data, area: Number(data.area), crop: Number(data.crop) },
	});
	if (response.type === "success") {
		const id = response.data.id ?? -1;
    if(id > 0){
      return await apiFetch({
        endpoint: `/areacultivo/${id}/`,
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

export const update = async ({ access, values: { id, data } }: { access: string; values: { id: number; data: {crop: number, area:number, date_harved: string} } }) => {
	let response = await apiFetch({
		endpoint: `/areacultivo/${id}/`,
		access,
		method: "PATCH",
		data
	});
	if (response.type === "success") {
		const id = response.data.id ?? -1;
    if(id > 0){
      return await apiFetch({
        endpoint: `/areacultivo/${id}/`,
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
		endpoint: `/areacultivo/${id}/`,
		access,
		method: "DELETE",
	});
};
