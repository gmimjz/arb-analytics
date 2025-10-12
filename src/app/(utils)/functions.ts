import {
  ECLIPSE_TOKEN_DECIMAL,
  SOLANA_TOKEN_DECIMAL,
} from "@/app/(utils)/consts";
import { Trade } from "@/app/(utils)/types";

export const formatAmount = (number: number, decimal: number) => {
  return (number / 10 ** decimal).toFixed(decimal);
};

export const formatAmountWithPrice = (
  number: number,
  decimal: number,
  token: string,
  price: number
) => {
  return calculateAmountWithPrice(number, decimal, token, price).toFixed(3);
};

export const calculateAmountWithPrice = (
  number: number,
  decimal: number,
  token: string,
  price: number
) => {
  return (number / 10 ** decimal) * price;
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const calculatePNLWithFees = (
  frontTrade: Trade,
  backTrade: Trade,
  profitToken: string,
  profitTokenPrice: number
) => {
  const frontFee = calculateAmountWithPrice(
    frontTrade.fee,
    ECLIPSE_TOKEN_DECIMAL["ETH"],
    "ETH",
    frontTrade.feeTokenPrice
  );

  const backFee = calculateAmountWithPrice(
    backTrade.fee,
    SOLANA_TOKEN_DECIMAL["SOL"],
    "SOL",
    backTrade.feeTokenPrice
  );

  const profit =
    frontTrade.realizedAmountFrom && backTrade.realizedAmountTo
      ? calculateAmountWithPrice(
          backTrade.realizedAmountTo - frontTrade.realizedAmountFrom,
          ECLIPSE_TOKEN_DECIMAL[profitToken],
          profitToken,
          profitTokenPrice
        )
      : 0;

  return -frontFee - backFee + profit;
};

export const formatPNLWithFees = (
  frontTrade: Trade,
  backTrade: Trade,
  profitToken: string,
  profitTokenPrice: number
) => {
  return calculatePNLWithFees(
    frontTrade,
    backTrade,
    profitToken,
    profitTokenPrice
  ).toFixed(3);
};
