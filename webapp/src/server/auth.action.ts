"use server";
import { setUserCookies, authenticate, logout } from "@/lib/session";
import { authSchema } from "@/schema/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface PrevStateLogin {
	fields?: z.infer<typeof authSchema>;
	issues?: { email?: string; password?: string, root?:string };
}

export const loginAction = async (prevState: PrevStateLogin, data: FormData) => {
	const formData = Object.fromEntries(data);
	const parsed = await authSchema.safeParseAsync(formData);

	if (parsed.success) {
		const { email, password } = parsed.data;
		const response = await authenticate({ email, password });
		if (response.access && response.refresh) {
			await setUserCookies({email, access:response.access});
			redirect("/dashboard");
		} else {
      console.log(response)
			if (response.error) {
				return {
					fields: parsed.data,
					issues: { root: response.error},
				}
			} 
			return {
				fields: parsed.data,
        issues: { username: response.email?.join(","), password:response.password?.join(","), root: response.detail },
			};
		}		
	} else {
		const errors = parsed.error.formErrors.fieldErrors;
		const parsedErrors = { username: errors.email?.join(", "), password: errors.password?.join(", "), root: "Please check wrong fields." };
		return {			
			fields: { email: (formData["email"] as string) ?? "", password: (formData["password"] as string) ?? "" },
			issues: parsedErrors,
		};
	}
};

export const logoutAction = async (prevState:{}, data:FormData) => {
  await logout()
  redirect("/");
}
