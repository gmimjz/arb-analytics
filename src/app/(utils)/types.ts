export interface Trade {
  txId: string;
  amountFrom: number;
  amountTo: number;
  realizedAmountFrom: number;
  realizedAmountTo: number;
  fee: number;
  feeTokenPrice: number;
  _id: string;
}

export interface Transaction {
  _id: string;
  profitToken: string;
  profitTokenPrice: number;
  intermediateToken: string;
  intermediateTokenPrice: number;
  frontTrade: Trade;
  backTrade: Trade;
  createdAt: string;
}

export interface DataAPIResponse {
  transactions: Transaction[];
}
