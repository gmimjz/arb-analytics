import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

type Props = {
  txId: string;
  chain: "solana" | "eclipse";
};

export const ExplorerLink = ({ txId, chain }: Props) => {
  const baseUrl =
    chain === "solana"
      ? "https://solscan.io/tx/"
      : "https://eclipsescan.xyz/tx/";

  return (
    <Link href={`${baseUrl}/${txId}`} target="_blank" rel="noopener noreferrer">
      <FaArrowUpRightFromSquare />
    </Link>
  );
};
