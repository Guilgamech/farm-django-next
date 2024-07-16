"use server"
import { getSession } from "@/lib/session"

export const getTrabajdor = async ()=>{
  const session = await getSession();
  if(session){
    const access = session.access;
  }
}