"use server"
import {z} from "zod"
import { authResponseSchema, authSuccessSchema } from "@/schema/auth";
import settings from "@/settings";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "./fetch";
import { TUserMeResponse } from "@/schema/users.schema";

export const authenticate= async ({email="", password=""}):Promise<z.infer<typeof authResponseSchema>> => {
  return new Promise<z.infer<typeof authResponseSchema>>(resolve=>{
    fetch(`${settings.API_URL}/token/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((response)=>{
      if (!response.ok) {
        if (response.status >= 500) {
          resolve({error:"No hay conexión con el servidor"})  
        }
      }
      return response.json();
    }).then(data=>{
      const parsed = authResponseSchema.safeParse(data);
      if(parsed.success){
        resolve({...parsed.data})
      }else{        
        const forceData = {...data} as z.infer<typeof authResponseSchema>;
        resolve(forceData)
      }
    }).catch((response)=>{
      resolve({error:"Error sin validar"})
    })
  });
}



const key = new TextEncoder().encode(settings.SECRET);

export async function encrypt(payload: any) {
	return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24 hours from now").sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export async function setUserCookies({email, access}:{email:string, access:string}) {
	const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const user = {email, access}
	const session = await encrypt({ user, expires });
	cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
	cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	const decrypted =  await decrypt(session);
  if(!decrypted.user) return null;
  return decrypted.user as {email:string, access:string}
}

export async function updateSession(request: NextRequest) {
	let res;
  
	if (request.nextUrl.pathname.includes("/dashboard")) {
		const session = request.cookies.get("session")?.value;
		if (!session) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
			return NextResponse.redirect(url);
    }else{
      const rolId = await getUserRolIdbySessionCookie(session);
      let canAccess = haveAccess(rolId, request.nextUrl.pathname)
      if(!canAccess){
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard/no-autorizado'
			  return NextResponse.redirect(url);
      }      
    }
	}
	return res;
}
/*
[
  {
    "id": 1,
    "name": "Administrador"
  },
  {
    "id": 2,
    "name": "Recursos Humanos"
  },
  {
    "id": 3,
    "name": "Jefe de Producción"
  },
  {
    "id": 4,
    "name": "Director"
  }
]*/

export const getUserRolIdbySessionCookie = async (session:string)=>{
  const decrypted =  await decrypt(session);
  const access = decrypted?.user?.access as string ?? ''
  if(access.length === 0){
    return 0;
  }
  const response = await apiFetch({
    endpoint: `/user/me/`,
    access,
    method: "GET"
  })
  if(response.type === "success"){
    const userData = response.data as TUserMeResponse
    return userData.user.rol
  }else{
    return 0
  }
}
const commonPages = [
  "/no-autorizado",
  "/account/profile"
];
const rolesPathAccess: {[key:number]: string[]} = {
  1: [...commonPages,
    "/trabajadores/gestionar-personal-de-oficina",
    "/trabajadores/roles"
  ],
  2: [...commonPages,
    "/trabajadores/gestionar-personal-agricola"
  ],
  3: [...commonPages,
    //pages
    "/areas",
    "/cultivos",
    "/flotas",
    "/enfermedades"
  ],
  4: [...commonPages,
    //pages
    "/reportes"
  ]
}
export const haveAccess = (rolId:number, pathName:string)=>{
  const currentPath = pathName.replace("/dashboard","")
  if(currentPath === "/" || currentPath.length === 0){
    return true;
  }
  const pathAuthorized = Array.isArray(rolesPathAccess[rolId]) ? rolesPathAccess[rolId].concat() : commonPages.concat();
  if(Array.isArray(pathAuthorized)){
    let canAccess = false;
    while (pathAuthorized.length && canAccess === false) {
      const checkPath = pathAuthorized.shift()
      canAccess = checkPath ? currentPath.includes(checkPath) : false
    }
    return canAccess
  }
  return false
}