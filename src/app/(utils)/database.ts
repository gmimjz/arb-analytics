import { Transaction } from "@/app/(models)/Transaction";
import { Transaction as TTransaction } from "@/app/(utils)/types";

export const getData = async (startAfter: number) => {
  const transactions = await Transaction.find({
    createdAt: { $gt: new Date(startAfter) },
  }).sort({
    createdAt: -1,
  });

  return {
    transactions: JSON.parse(JSON.stringify(transactions)) as TTransaction[],
  };
};
