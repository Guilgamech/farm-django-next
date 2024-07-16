import { getAllResultsForUser } from "@/lib/api.requests";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const user = await getSession();
  if(user){
    const data = await getAllResultsForUser(user);
    return new NextResponse(JSON.stringify(data), { status: 200 });
  }else{
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }
}