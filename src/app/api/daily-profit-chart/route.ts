import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getDailyProfitChart } from "@/app/(utils)/database";

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

  const data = await getDailyProfitChart();
  return NextResponse.json(data);
}
