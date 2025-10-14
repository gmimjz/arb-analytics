import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { HomePage } from "@/app/(pages)/HomePage";
import { getDailyProfitChart, getTransactions } from "@/app/(utils)/database";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (accessToken?.value !== process.env.ACCESS_TOKEN) {
    redirect("/");
  }

  await mongoose.connect(process.env.MONGODB_URI ?? "");
  const transactions = await getTransactions(0);
  const dailyProfitChart = await getDailyProfitChart();

  return (
    <HomePage
      initialTransactions={transactions}
      initialDailyProfitChart={dailyProfitChart}
    />
  );
}
