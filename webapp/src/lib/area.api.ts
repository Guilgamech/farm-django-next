"use server"
import settings from "@/settings"
import { apiFetch } from "./fetch"
import { TArea, TAreaFields } from "@/schema/area.schema"
import { string } from "zod"

export const list = async ({access}:{access:string})=>{
  let response = await apiFetch({
    endpoint: "/areas/",
    access,
    method: "GET"
  })
  if(response.type === "success"){
    return response.data as TArea[]
  }else{
    return "Unauthorized"
  }
}

export const create = async ({access, data}:{access:string, data:TAreaFields})=>{
  let response = await apiFetch({
    endpoint: "/areas/",
    access,
    method: "POST",
    data: {...data, total_area: Number(data.total_area)}
  })
  if(response.type === "success"){
    return response.data as TArea
  }else{
    return "Unauthorized"
  }
}
export const update = async ({access, values:{id, data}}:{access:string, values:{id:number, data:TAreaFields}})=>{
  let response = await apiFetch({
    endpoint: `/areas/${id}/`,
    access,
    method: "PUT",
    data: {...data, total_area: Number(data.total_area)}
  })
  if(response.type === "success"){
    return response.data as TArea
  }else{
    return "Unauthorized"
  }
}

export const destroy = async({access, id}:{access:string; id:number})=>{
  let response = await apiFetch({
    endpoint: `/areas/${id}/`,
    access,
    method: "DELETE"
  })
  return response.type === "success"
}