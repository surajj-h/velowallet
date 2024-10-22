import React from "react";

export const Card = ({
  title,
  children,
  className
}: {
  title: string;
  children?: React.ReactNode;
  className: string
}) => {
  return (
    <div
      className={`border p-4 rounded-md ${className}`}
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      {children}
    </div>
  );
}
