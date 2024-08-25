"use server"
import settings from "@/settings"
import { apiFetch } from "./fetch"
import { TRol, TRolFields } from "@/schema/rol.schema"
import { string } from "zod"

export const list = async ({access}:{access:string})=>{
  let response = await apiFetch({
    endpoint: "/role/",
    access,
    method: "GET"
  })
  if(response.type === "success"){
    return response.data as TRol[]
  }else{
    return [] as TRol[]
  }
}

export const create = async ({access, data}:{access:string, data:TRolFields})=>{
  return await apiFetch({
    endpoint: "/role/",
    access,
    method: "POST",
    data: {...data}
  })

}
export const update = async ({access, values:{id, data}}:{access:string, values:{id:number, data:TRolFields}})=>{
  return await apiFetch({
    endpoint: `/role/${id}/`,
    access,
    method: "PUT",
    data: {...data}
  })

}

export const destroy = async({access, id}:{access:string; id:number})=>{
  return await apiFetch({
    endpoint: `/role/${id}/`,
    access,
    method: "DELETE"
  })

}