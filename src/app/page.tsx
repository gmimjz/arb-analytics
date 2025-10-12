import { HomePage } from "@/app/(pages)/HomePage";
import { getData } from "@/app/(utils)/database";
import mongoose from "mongoose";
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

  await mongoose.connect(process.env.MONGODB_URI ?? "");

  const data = await getData(0);

  return <HomePage initialIsAuthenticated={true} initialData={data} />;
}
