"use server"
import settings from "@/settings"
import { apiFetch } from "./fetch"
import { TTrabajador } from "@/schema/trabajador.schema"

// List Trabajador
export const list = async ({access}:{access:string})=>{
  let response = await apiFetch({
    endpoint: "/trabajadores/",
    access,
    method: "GET"
  })
  if(response.type === "success"){
    return response.data as TTrabajador[]
  }else{
    return "Unauthorized"
  }
}
