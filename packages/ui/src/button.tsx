"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void,
  color?: string
}

export const Button = ({ children, onClick, color = "white" }: ButtonProps) => {
  return (
    <button
      className={`text-[${color}] hover:text-white hover:bg-[#803aed] ring-1 ring-[#9B7EBD] focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 mb-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
