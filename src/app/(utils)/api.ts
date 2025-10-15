import { Transaction } from "@/app/(utils)/types";

export const auth = async (accessToken: string) => {
  await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ accessToken }),
    cache: "no-store",
  });
};

export const fetchTransactions = async (page: number) => {
  const params = new URLSearchParams();
  params.set("page", page.toString());

  const response = await fetch(`/api/transactions?${params.toString()}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    return { transactions: [], count: 0 };
  }

  const data = await response.json();
  return data as { transactions: Transaction[]; count: number };
};
