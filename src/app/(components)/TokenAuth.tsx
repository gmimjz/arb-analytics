"use client";

import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";

type Props = {
  handleAuth: (token: string) => void;
};

export const TokenAuth = ({ handleAuth }: Props) => {
  const [token, setToken] = useState("");

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAuth(token);
    }
  };

  return (
    <div className="w-full flex justify-center flex-col gap-4 items-center mt-16">
      <TextField.Root
        value={token}
        placeholder="Token"
        onChange={(e) => setToken(e.target.value)}
        onKeyDown={handleEnter}
      ></TextField.Root>
      <Button onClick={() => handleAuth(token)}>Enter</Button>
    </div>
  );
};
