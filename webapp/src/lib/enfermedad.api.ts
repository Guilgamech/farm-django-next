import settings from "@/settings";
import { apiFetch } from "./fetch";
import { TEnfermedad, TEnfermedadFields, TEnfermedadRead} from "@/schema/enfermedad.schema";

export const list = async ({ access }: { access: string }) => {
  let response = await apiFetch({
    endpoint: "/enfermedades/",
    access,
    method: "GET",
  });
  if (response.type === "success") {
    return response.data as TEnfermedadRead[];
  } else {
    return [] as TEnfermedadRead[];
  }
};

export const create = async ({
  access,
  data,
}: {
  access: string;
  data: TEnfermedadFields;
}) => {
  return await apiFetch({
    endpoint: "/enfermedades/",
    access,
    method: "POST",
    data: { ...data, type: Number(data.type_crops) },
  });
};

export const update = async ({
  access,
  values: { id, data },
}: {
  access: string;
  values: { id: number; data: TEnfermedadFields };
}) => {
return await apiFetch({
    endpoint: `/enfermedades/${id}/`,
    access,
    method: "PUT",
    data: { ...data, type: Number(data.type_crops) },
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
    endpoint: `/enfermedades/${id}/`,
    access,
    method: "DELETE",
  });

};
