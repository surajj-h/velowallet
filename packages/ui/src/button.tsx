"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void,
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className={`text-white hover:text-white bg-[#470368] hover:bg-[#67178C] ring-1 ring-[#470368] font-extralight rounded-xl text-md px-5 py-2 mt-2 mb-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
