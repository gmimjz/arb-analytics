import { getData } from "@/app/(utils)/database";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({}, { status: 401 });
  }
  if (token !== process.env.ACCESS_TOKEN) {
    return NextResponse.json({}, { status: 403 });
  }

  await mongoose.connect(process.env.MONGODB_URI ?? "");

  const startAfter = new URL(request.url).searchParams.get("startAfter");
  const data = await getData(startAfter ? +startAfter : 0);
  return NextResponse.json(data);
}
