import {z} from "zod"
import { authResponseSchema, authSuccessSchema } from "@/schema/auth";
import settings from "@/settings";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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
      console.log({response})
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
    }
	}
	return res;
}
