"use client";

import { useEffect, useMemo, useState } from "react";
import { Chart } from "@/app/(components)/Chart";
import { DataTable } from "@/app/(components)/DataTable";
import { Transaction } from "@/app/(utils)/types";
import { fetchTransactions } from "@/app/(utils)/api";
import { Pagination } from "@/app/(components)/Pagination";

interface Props {
  initialTransactions: Transaction[];
  initialTransactionsCount: number;
  initialDailyProfitChart: { date: string; value: number }[];
}

export const HomePage = ({
  initialTransactions,
  initialTransactionsCount,
  initialDailyProfitChart,
}: Props) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [transactionsCount, setTransactionsCount] = useState(
    initialTransactionsCount
  );
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    const loadTransactions = async () => {
      const { transactions, count } = await fetchTransactions(currentPage - 1);
      setTransactions(transactions);
      setTransactionsCount(count);
    };

    loadTransactions();
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-2 my-2">
      <div className="lg:flex m-2">
        <div className="flex-1">
          <Chart title="Daily Profit" color="#2fc77e" data={dailyProfitChart} />
        </div>
        <div className="flex-1">
          <Chart
            title="Cumulative Profit"
            color="#e1554a"
            data={cumulativeProfitChart}
          />
        </div>
      </div>
      <div className="overflow-x-scroll">
        <DataTable transactions={transactions} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Pagination
          totalPages={Math.ceil(transactionsCount / 50)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        Total Transactions: {transactionsCount}
      </div>
    </div>
  );
};
