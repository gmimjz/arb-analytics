"use client";

import { DataTable } from "@/app/(components)/DataTable";
import { TokenAuth } from "@/app/(components)/TokenAuth";
import { auth, fetchData } from "@/app/(utils)/api";
import { DataAPIResponse } from "@/app/(utils)/types";
import { useEffect, useState } from "react";

interface Props {
  initialIsAuthenticated: boolean;
  initialData: DataAPIResponse;
}

export const HomePage = ({ initialIsAuthenticated, initialData }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialIsAuthenticated
  );
  const [transactions, setTransactions] = useState(initialData.transactions);

  const [startAfter, setStartAfter] = useState(+Date.now());

  const handleAuth = async (token: string) => {
    await auth(token);

    const data = await fetchData(0);
    if (data) {
      setTransactions(data.transactions);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      setStartAfter(+Date.now());

      const data = await fetchData(startAfter);
      if (data) {
        setTransactions([...data.transactions, ...transactions]);
      } else {
        setIsAuthenticated(false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [startAfter, transactions]);

  if (isAuthenticated) {
    return <DataTable transactions={transactions} />;
  } else {
    return <TokenAuth handleAuth={handleAuth} />;
  }
};
