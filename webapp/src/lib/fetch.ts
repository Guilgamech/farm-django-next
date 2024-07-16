import settings from "@/settings"

export const apiFetch = async ({endpoint, access, method, data}:{
  endpoint:string
  access:string
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: Record<string, unknown>
}) => {
    let result;
    try {
      result = await fetch(`${settings.API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${access}`
        },
        body: data ? JSON.stringify(data) : undefined,
        cache: "no-store"
      })  
    } catch (error) {
      console.log(error)
    }
    if(result && result.ok){
      if(method === "DELETE"){
        return {type:"success", data: "deleted"};
      }else{
        const response = await result.json()
        return {type:"success", data: response};
      }      
    }else if (result && result.status){
      const dataError = await result.json();
      console.log(dataError)
      return {type:"error", data: JSON.stringify(result)}
    }
    else {
      return {type:"error", data: JSON.stringify(result)}
    }
}