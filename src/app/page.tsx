import { HomePage } from "@/app/(pages)/HomePage";
import { getData } from "@/app/(utils)/database";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (accessToken?.value !== process.env.ACCESS_TOKEN) {
    return (
      <HomePage
        initialIsAuthenticated={false}
        initialData={{ transactions: [] }}
      />
    );
  }

  const data = await getData(0);

  return <HomePage initialIsAuthenticated={true} initialData={data} />;
}
