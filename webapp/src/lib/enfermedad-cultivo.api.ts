"use server";

import { TEnfermedadCultivoRead, TEnfermedadCultivoFields, TCureFields } from "@/schema/enfermedadcultivo.schema";
import { apiFetch } from "./fetch";

// List Agricola
export const list = async ({ access }: { access: string }) => {
	let response = await apiFetch({
		endpoint: "/enfermedadcultivo/",
		access,
		method: "GET",
	});
	if (response.type === "success") {
		return response.data as TEnfermedadCultivoRead[];
	} else {
		return [] as TEnfermedadCultivoRead[];
	}
};

// Create AreaCultivo
export const create = async ({ access, data }: { access: string; data: TEnfermedadCultivoFields }) => {
	let response = await apiFetch({
		endpoint: "/enfermedadcultivo/",
		access,
		method: "POST",
		data: { ...data, disease: Number(data.disease), crop: Number(data.crop) },
	});
	if (response.type === "success") {
		const id = response.data.id ?? -1;
    if(id > 0){
      return await apiFetch({
        endpoint: `/enfermedadcultivo/${id}/`,
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

export const update = async ({ access, values: { id, data } }: { access: string; values: { id: number; data: {crop: number, disease:number, end: string} } }) => {
	let response = await apiFetch({
		endpoint: `/enfermedadcultivo/${id}/`,
		access,
		method: "PATCH",
		data
	});
	if (response.type === "success") {
		const id = response.data.id ?? -1;
    if(id > 0){
      return await apiFetch({
        endpoint: `/enfermedadcultivo/${id}/`,
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
		endpoint: `/enfermedadcultivo/${id}/`,
		access,
		method: "DELETE",
	});
};
