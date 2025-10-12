import { HomePage } from "@/app/(pages)/HomePage";
import { fetchData } from "@/app/(utils)/api";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  const data = await fetchData(accessToken?.value ?? "");

  return (
    <HomePage
      initialIsAuthenticated={data !== null}
      initialData={data ?? { transactions: [] }}
    />
  );
}
