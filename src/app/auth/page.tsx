import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AuthPage } from "@/app/(pages)/AuthPage";

export default async function Auth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (
    accessToken?.value === process.env.ACCESS_TOKEN ||
    accessToken?.value === process.env.ADMIN_ACCESS_TOKEN
  ) {
    redirect("/");
  }

  return <AuthPage />;
}
