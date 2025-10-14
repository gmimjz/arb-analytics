"use client";

import { useMemo, useState } from "react";
import { Chart } from "@/app/(components)/Chart";
import { DataTable } from "@/app/(components)/DataTable";
import { Transaction } from "@/app/(utils)/types";

interface Props {
  initialTransactions: Transaction[];
  initialDailyProfitChart: { date: string; value: number }[];
}

export const HomePage = ({
  initialTransactions,
  initialDailyProfitChart,
}: Props) => {
  const [transactions] = useState(initialTransactions);
  const [dailyProfitChart] = useState(initialDailyProfitChart);

  const cumulativeProfitChart = useMemo(() => {
    let cumulativeSum = 0;
    return dailyProfitChart.map((item) => {
      cumulativeSum += item.value;
      return {
        date: item.date,
        value: cumulativeSum,
      };
    });
  }, [dailyProfitChart]);

  return (
    <>
      <div className="flex">
        <Chart title="Daily Profit" color="#2fc77e" data={dailyProfitChart} />
        <Chart
          title="Cumulative Profit"
          color="#e1554a"
          data={cumulativeProfitChart}
        />
      </div>
      <DataTable transactions={transactions} />
    </>
  );
};
