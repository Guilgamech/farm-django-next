"use server"
import settings from "@/settings"
import { apiFetch } from "./fetch"
import { TTipoFlota, TTipoFlotaFields } from "@/schema/tipof.schema"
import { string } from "zod"

export const list = async ({access}:{access:string})=>{
  let response = await apiFetch({
    endpoint: "/tipo_flota/",
    access,
    method: "GET"
  })
  if(response.type === "success"){
    return response.data as TTipoFlota[]
  }else{
    return "Unauthorized"
  }
}

export const create = async ({access, data}:{access:string, data:TTipoFlotaFields})=>{
  let response = await apiFetch({
    endpoint: "/tipo_flota/",
    access,
    method: "POST",
    data: {...data}
  })
  if(response.type === "success"){
    return response.data as TTipoFlota
  }else{
    return "Unauthorized"
  }
}
export const update = async ({access, values:{id, data}}:{access:string, values:{id:number, data:TTipoFlotaFields}})=>{
  let response = await apiFetch({
    endpoint: `/tipo_flota/${id}/`,
    access,
    method: "PUT",
    data: {...data}
  })
  if(response.type === "success"){
    return response.data as TTipoFlota
  }else{
    return "Unauthorized"
  }
}

export const destroy = async({access, id}:{access:string; id:number})=>{
  let response = await apiFetch({
    endpoint: `/tipo_flota/${id}/`,
    access,
    method: "DELETE"
  })
  return response.type === "success"
}