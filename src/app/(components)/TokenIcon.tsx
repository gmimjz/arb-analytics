import Image from "next/image";

type Props = {
  token: string;
};

export const TokenIcon = ({ token }: Props) => {
  return (
    <Image
      className="w-6 h-6 shrink-0"
      src={`/${token.toLowerCase()}.webp`}
      alt={token}
      height={24}
      width={24}
    />
  );
};
