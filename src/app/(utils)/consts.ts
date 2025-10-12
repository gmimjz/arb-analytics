export enum Token {
  ETH = "ETH",
  SOL = "SOL",
  USDC = "USDC",
  ORCA = "ORCA",
}

export const ECLIPSE_TOKEN_DECIMAL: Record<string, number> = {
  [Token.ETH]: 9,
  [Token.SOL]: 9,
  [Token.USDC]: 6,
  [Token.ORCA]: 6,
};

export const SOLANA_TOKEN_DECIMAL: Record<string, number> = {
  [Token.ETH]: 8,
  [Token.SOL]: 9,
  [Token.USDC]: 6,
  [Token.ORCA]: 6,
};
