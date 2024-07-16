"use server"
import settings from "@/settings"
import { apiFetch } from "./fetch"
import { TTipoCultivo, TTipoCultivoFields } from "@/schema/tipoc.schema"
import { string } from "zod"

export const list = async ({access}:{access:string})=>{
  let response = await apiFetch({
    endpoint: "/tipo_cultivos/",
    access,
    method: "GET"
  })
  if(response.type === "success"){
    return response.data as TTipoCultivo[]
  }else{
    return "Unauthorized"
  }
}

export const create = async ({access, data}:{access:string, data:TTipoCultivoFields})=>{
  let response = await apiFetch({
    endpoint: "/tipo_cultivos/",
    access,
    method: "POST",
    data: {...data}
  })
  if(response.type === "success"){
    return response.data as TTipoCultivo
  }else{
    return "Unauthorized"
  }
}
export const update = async ({access, values:{id, data}}:{access:string, values:{id:number, data:TTipoCultivoFields}})=>{
  let response = await apiFetch({
    endpoint: `/tipo_cultivos/${id}/`,
    access,
    method: "PUT",
    data: {...data}
  })
  if(response.type === "success"){
    return response.data as TTipoCultivo
  }else{
    return "Unauthorized"
  }
}

export const destroy = async({access, id}:{access:string; id:number})=>{
  let response = await apiFetch({
    endpoint: `/tipo_cultivos/${id}/`,
    access,
    method: "DELETE"
  })
  return response.type === "success"
}