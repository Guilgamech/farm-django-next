import { shareResult } from "@/lib/api.requests";
import { getSession } from "@/lib/session";
import { bodyParamsResultShareSchema } from "@/schema/results";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const user = await getSession();
  //validate user
  if(!user){
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }  
  const bodyParams = await request.json();
  //validate BodyParams
  const parsed = bodyParamsResultShareSchema.safeParse(bodyParams)
  if(!parsed.success){
    return new NextResponse(JSON.stringify({ message: "Wrong BodyParams" , errors: parsed.error.formErrors.fieldErrors }), { status: 400 });
  }
  const sended = await shareResult({token:user.token, user_id: String(user.user_id), ...parsed.data})
  if(sended){
    return new NextResponse(JSON.stringify({ ...parsed.data }), { status: 200 });
  }
  return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
}
