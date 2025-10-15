import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json();
  if (
    accessToken !== process.env.ACCESS_TOKEN &&
    accessToken !== process.env.ADMIN_ACCESS_TOKEN
  ) {
    return NextResponse.json({}, { status: 401 });
  }

  const response = NextResponse.json({});
  response.cookies.set({
    name: "access_token",
    value: accessToken ?? "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return response;
}
