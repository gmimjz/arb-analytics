import { Transaction } from "@/app/(models)/Transaction";
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

  const query: { createdAt?: { $gt: Date } } = {};
  const startAfter = new URL(request.url).searchParams.get("startAfter");
  if (startAfter) {
    const startDate = new Date(Number(startAfter));
    query.createdAt = { $gt: startDate };
  }

  const transactions = await Transaction.find(query)
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({ transactions });
}
