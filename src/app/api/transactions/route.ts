import { getTransactions } from "@/app/(utils)/database";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({}, { status: 401 });
  }
  if (
    token !== process.env.ACCESS_TOKEN &&
    token !== process.env.ADMIN_ACCESS_TOKEN
  ) {
    return NextResponse.json({}, { status: 403 });
  }

  await mongoose.connect(process.env.MONGODB_URI ?? "");

  const { searchParams } = new URL(request.url);
  const page = +(searchParams.get("page") ?? "0");
  const data = await getTransactions(
    page,
    token === process.env.ADMIN_ACCESS_TOKEN
  );
  return NextResponse.json(data);
}
