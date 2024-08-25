import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const waitTime = (time = 500) => {
  return new Promise<void>((resolve) => {
      setTimeout(() => {
          resolve();
      }, time);
  });
}

export const timestampToDate = (timestamp:number)=>{  
  const date = new Date(timestamp * 1000);
  const formatted = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  return formatted
}
export const tiemestampToDate = (timestamp:number)=>{
  return new Date(timestamp * 1000);
}
export const formatDateToString = (date:Date)=>{
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

export const formatDateStringBig = (date:Date)=>{
  let formattedDate = date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  formattedDate = formattedDate.replace(',', ' at'); // Replace ',' with ' at'
  return formattedDate;
}

export const parseErrors = (data:Record<string, string | string[]>)=>{
  const keysData = Object.keys(data);
  if (keysData.includes("error") && data["error"] === 'api-error'){
    return { root: "Error en la api, contacte al administrador" }
  }
  else if (keysData.includes("error") && data["error"] === "no-autorizado"){
    return { root: "No está autorizado" }
  }
  else if (keysData.includes("non_field_errors")){
    return { root: "La relación ya existe en la base de datos" }
  }
  return {...data, root:"Rectifica los campos con error"}
}