import { model, Model, models, Schema } from "mongoose";

interface ITrade {
  txId: string;
  amountFrom: number;
  amountTo: number;
  realizedAmountFrom?: number | null;
  realizedAmountTo?: number | null;
  fee?: number | null;
  feeTokenPrice?: number | null;
}

export interface ITransaction extends Document {
  profitToken: string;
  profitTokenPrice?: number | null;
  intermediateToken: string;
  intermediateTokenPrice?: number | null;
  frontTrade: ITrade;
  backTrade: ITrade;
  createdAt: Date;
}

const tradeSchema = new Schema<ITrade>({
  txId: { type: String, required: true },
  amountFrom: { type: Number, required: true },
  amountTo: { type: Number, required: true },
  realizedAmountFrom: { type: Number, default: null },
  realizedAmountTo: { type: Number, default: null },
  fee: { type: Number, default: null },
  feeTokenPrice: { type: Number, default: null },
});

export const transactionSchema = new Schema<ITransaction>({
  profitToken: { type: String, required: true },
  profitTokenPrice: { type: Number, default: null },
  intermediateToken: { type: String, required: true },
  intermediateTokenPrice: { type: Number, default: null },
  frontTrade: { type: tradeSchema, required: true },
  backTrade: { type: tradeSchema, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

export const Transaction: Model<ITransaction> =
  models.Transaction || model<ITransaction>("Transaction", transactionSchema);
