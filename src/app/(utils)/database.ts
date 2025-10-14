import { Transaction } from "@/app/(models)/Transaction";
import { calculatePNLWithFees } from "@/app/(utils)/functions";
import { Trade, Transaction as TTransaction } from "@/app/(utils)/types";

export const getTransactions = async (page: number) => {
  const transactions = await Transaction.find({})
    .sort({
      createdAt: -1,
    })
    .skip(page * 50)
    .limit(50)
    .lean();

  return JSON.parse(JSON.stringify(transactions)) as TTransaction[];
};

export const getDailyProfitChart = async () => {
  const transactions = await Transaction.find({}).sort({
    createdAt: 1,
  });

  const tradesWithPNL = transactions.map((trade) => ({
    ...trade.toObject(),
    pnl: calculatePNLWithFees(
      trade.frontTrade as Trade,
      trade.backTrade as Trade,
      trade.profitToken,
      trade.profitTokenPrice ?? 0
    ),
    date: trade.createdAt.toISOString().slice(0, 10),
  }));

  const dailyPNL = tradesWithPNL.reduce<Record<string, number>>(
    (acc, trade) => {
      const { date, pnl } = trade;
      if (!acc[date]) acc[date] = 0;
      acc[date] += pnl;
      return acc;
    },
    {}
  );

  return Object.entries(dailyPNL).map(([date, value]) => ({
    date,
    value,
  }));
};
