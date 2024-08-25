import settings from "@/settings"

export const apiFetch = async ({
  endpoint, 
  access, 
  method, 
  data
}: {
  endpoint: string,
  access: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: Record<string, unknown>
}): Promise<{type: "success" | "error", data: any | Record<string, unknown>}> => {
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
    });  
  } catch (error) {
    return {type: "error", data: {"error": "api-error"} as Record<string, unknown>};
  }

  if (result && result.ok) {
    if (method === "DELETE") {
      return {type: "success", data: {}};
    } else {
      let response;
      try {
        response = await result.json();
      } catch (error) {}
      if(response){
        return {type: "success", data: response as Record<string, unknown>};
      }
      return {type: "error", data: {"error": "api-error"} as Record<string, unknown>}
    }
  } else {
    let dataError = {"error": "api-error"}
    if (result.status === 400 ){
      try {
        dataError = await result.json();
      } catch (error) {
      }
    } else if (result.status === 401){
      dataError = {"error": "no-autorizado"}
    }
    return {type: "error", data: dataError as Record<string, unknown>};
  }
};