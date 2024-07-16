import { getAllDocuments } from "@/lib/api.requests";
import { getSession, logout } from "@/lib/session";
import { bodyParamsResultDetailSchema } from "@/schema/results";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSession();
  //validate user
  if(!user){
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }  
  const bodyParams = await request.json();
  //validate idParam
  const id = Number(params.id)
  if (isNaN(id)) {
    return new NextResponse(JSON.stringify({ message: 'Invalid result ID!' }), { status: 401 });
  }
  //validate BodyParams
  const parsed = bodyParamsResultDetailSchema.safeParse(bodyParams)
  if(!parsed.success){
    return new NextResponse(JSON.stringify({ message: "Wrong BodyParams" , errors: parsed.error.formErrors.fieldErrors }), { status: 400 });
  }
  //return new NextResponse(JSON.stringify({ id, data: parsed.data , user }), { status: 200 });
  const data = await getAllDocuments({token:user.token, pec_event_id:id, type:parsed.data.type as "uploaded_result" | "appointment_result", result_count:parsed.data.result_count ?? 1 });
  if(data && data!== "unauthorized"){
    return new NextResponse(JSON.stringify({ data }), { status: 200 });
  }
  else if(data && data === "unauthorized"){
    await logout()
    return new NextResponse(JSON.stringify({ message: "Unauthorized"}), { status: 401 });
  }
  return new NextResponse(JSON.stringify({ message: "Bad Request"}), { status: 400 });
}
