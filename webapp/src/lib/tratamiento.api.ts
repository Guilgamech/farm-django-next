import settings from "@/settings";
import { apiFetch } from "./fetch";
import { TTratamiento, TTratamientoFields, TTratamientoRead} from "@/schema/tratamiento.schema";

export const list = async ({ access }: { access: string }) => {
  let response = await apiFetch({
    endpoint: "/tratamientos/",
    access,
    method: "GET",
  });
  if (response.type === "success") {
    return response.data as TTratamientoRead[];
  } else {
    return [] as TTratamientoRead[];
  }
};

export const create = async ({
  access,
  data,
}: {
  access: string;
  data: TTratamientoFields;
}) => {
  return await apiFetch({
    endpoint: "/tratamientos/",
    access,
    method: "POST",
    data: { ...data, type: Number(data.disease) },
  });

};

export const update = async ({
  access,
  values: { id, data },
}: {
  access: string;
  values: { id: number; data: TTratamientoFields };
}) => {
  return await apiFetch({
    endpoint: `/tratamientos/${id}/`,
    access,
    method: "PUT",
    data: { ...data, type: Number(data.disease) },
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
    endpoint: `/tratamientoes/${id}/`,
    access,
    method: "DELETE",
  });

};
