"use client";

import { TokenIcon } from "@/app/(components)/TokenIcon";
import { Trade } from "@/app/(components)/Trade";
import {
  ECLIPSE_TOKEN_DECIMAL,
  SOLANA_TOKEN_DECIMAL,
} from "@/app/(utils)/consts";
import {
  formatAmount,
  formatAmountWithPrice,
  formatDate,
  formatPNLWithFees,
} from "@/app/(utils)/functions";
import { Transaction } from "@/app/(utils)/types";
import { Table } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";

interface Props {
  transactions: Transaction[];
}

export const DataTable = ({ transactions }: Props) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Front Trade</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Back Trade</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Fees</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>P&L</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>P&L with fees</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {transactions.map(
          ({
            profitToken,
            profitTokenPrice,
            intermediateToken,
            intermediateTokenPrice,
            createdAt,
            frontTrade,
            backTrade,
          }) => (
            <Table.Row key={createdAt?.toString()}>
              <Table.Cell className="whitespace-nowrap">
                {formatDate(createdAt)}{" "}
                <span className="hidden sm:inline">
                  {`(${formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                  })})`}
                </span>
              </Table.Cell>
              <Table.Cell>
                <Trade
                  profitToken={profitToken}
                  intermediateToken={intermediateToken}
                  realizedAmountFrom={frontTrade.realizedAmountFrom}
                  realizedAmountTo={frontTrade.realizedAmountTo}
                  txId={frontTrade.txId}
                  chain="eclipse"
                />
              </Table.Cell>
              <Table.Cell>
                <Trade
                  profitToken={profitToken}
                  intermediateToken={intermediateToken}
                  realizedAmountFrom={backTrade.realizedAmountFrom}
                  realizedAmountTo={backTrade.realizedAmountTo}
                  txId={backTrade.txId}
                  chain="solana"
                />
              </Table.Cell>
              <Table.Cell>
                <div className="flex gap-2 items-center whitespace-nowrap">
                  {formatAmount(frontTrade.fee, ECLIPSE_TOKEN_DECIMAL["ETH"])} (
                  {formatAmountWithPrice(
                    frontTrade.fee,
                    ECLIPSE_TOKEN_DECIMAL["ETH"],
                    "ETH",
                    frontTrade.feeTokenPrice
                  )}
                  $)
                  <TokenIcon token="ETH" />
                  {formatAmount(backTrade.fee, SOLANA_TOKEN_DECIMAL["SOL"])} (
                  {formatAmountWithPrice(
                    backTrade.fee,
                    SOLANA_TOKEN_DECIMAL["SOL"],
                    "SOL",
                    backTrade.feeTokenPrice
                  )}
                  $)
                  <TokenIcon token="SOL" />
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex gap-2 items-center whitespace-nowrap">
                  {frontTrade.realizedAmountFrom &&
                  backTrade.realizedAmountTo ? (
                    <>
                      {formatAmount(
                        backTrade.realizedAmountTo -
                          frontTrade.realizedAmountFrom,
                        ECLIPSE_TOKEN_DECIMAL[profitToken]
                      )}{" "}
                      (
                      {formatAmountWithPrice(
                        backTrade.realizedAmountTo -
                          frontTrade.realizedAmountFrom,
                        ECLIPSE_TOKEN_DECIMAL[profitToken],
                        profitToken,
                        profitTokenPrice
                      )}
                      $)
                      <TokenIcon token={profitToken} />
                    </>
                  ) : (
                    <span className="text-red-500 font-bold">FAILED</span>
                  )}
                </div>
              </Table.Cell>
              <Table.Cell>
                <>
                  {formatPNLWithFees(
                    frontTrade,
                    backTrade,
                    profitToken,
                    profitTokenPrice,
                    intermediateToken,
                    intermediateTokenPrice
                  )}
                  $
                </>
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table.Root>
  );
};
