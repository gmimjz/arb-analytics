"use client";

import { auth } from "@/app/(utils)/api";
import { Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useState } from "react";

export const AuthPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");

  const handleAuth = async (token: string) => {
    await auth(token);
    router.push("/");
  };

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
