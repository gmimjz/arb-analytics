import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { HomePage } from "@/app/(pages)/HomePage";
import { getDailyProfitChart, getTransactions } from "@/app/(utils)/database";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (
    accessToken?.value !== process.env.ACCESS_TOKEN &&
    accessToken?.value !== process.env.ADMIN_ACCESS_TOKEN
  ) {
    redirect("/auth");
  }

  await mongoose.connect(process.env.MONGODB_URI ?? "");
  const { transactions, count } = await getTransactions(
    0,
    accessToken?.value === process.env.ADMIN_ACCESS_TOKEN
  );
  const dailyProfitChart = await getDailyProfitChart();

  return (
    <HomePage
      initialTransactions={transactions}
      initialTransactionsCount={count}
      initialDailyProfitChart={dailyProfitChart}
    />
  );
}
