import { ExplorerLink } from "@/app/(components)/ExplorerLink";
import { TokenIcon } from "@/app/(components)/TokenIcon";
import {
  ECLIPSE_TOKEN_DECIMAL,
  SOLANA_TOKEN_DECIMAL,
} from "@/app/(utils)/consts";
import { formatAmount } from "@/app/(utils)/functions";
import { FaArrowRightLong } from "react-icons/fa6";

type Props = {
  profitToken: string;
  intermediateToken: string;
  realizedAmountFrom: number | null;
  realizedAmountTo: number | null;
  txId: string | null;
  chain: "solana" | "eclipse";
};

export const Trade = ({
  profitToken,
  intermediateToken,
  realizedAmountFrom,
  realizedAmountTo,
  txId,
  chain,
}: Props) => {
  const fromToken = chain === "solana" ? intermediateToken : profitToken;
  const toToken = chain === "solana" ? profitToken : intermediateToken;
  const decimals =
    chain === "solana" ? SOLANA_TOKEN_DECIMAL : ECLIPSE_TOKEN_DECIMAL;

  if (!realizedAmountFrom || !realizedAmountTo) {
    return (
      <div className="flex gap-2 items-center">
        <span className="text-red-500 font-bold">FAILED</span>{" "}
        {txId && <ExplorerLink txId={txId} chain={chain} />}
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {formatAmount(realizedAmountFrom, decimals[fromToken])}
      <TokenIcon token={fromToken} />

      <FaArrowRightLong className="w-4 h-4" />

      {formatAmount(realizedAmountTo, decimals[toToken])}
      <TokenIcon token={toToken} />

      {txId && <ExplorerLink txId={txId} chain={chain} />}
    </div>
  );
};
