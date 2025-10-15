"use client";

import * as React from "react";
import { Button, TextField } from "@radix-ui/themes";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer"
      >
        Previous
      </Button>
      <TextField.Root className="w-12" value={currentPage} />/{totalPages}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer"
      >
        Next
      </Button>
    </div>
  );
};
