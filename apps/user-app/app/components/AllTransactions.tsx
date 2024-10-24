"use client";

import { Card } from "@repo/ui/card";
import { useSession } from "next-auth/react";

export const AllTransactions = ({
  className,
  transactions
}: {
  className: string;
  transactions: {
    time: Date;
    amount: number;
    from: string;
    to: string;
    fromNumber: string;
    toNumber: string;
  }[];
}) => {
  const session = useSession();
  const userId = session?.data?.user?.email || "";

  return (
    <Card title="Transactions" className={className}>
      <div className="flex flex-col space-y-4">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-md shadow-md flex items-center justify-between mb-2"
            >
              <div
                className={`text-lg font-bold ${transaction.fromNumber === userId ? "text-red-600" : "text-green-600"}`}
              >
                {transaction.fromNumber === userId ? "-" : "+"}${(transaction.amount) / 100}
              </div>

              <div className="flex-1 text-center font-semibold text-gray-800 mx-4"> {/* Added mx-4 for horizontal spacing */}
                {transaction.fromNumber === userId
                  ? `Sent to: ${transaction.to}`
                  : `Received from: ${transaction.from}`}
              </div>

              <div className="text-right text-gray-600 text-sm mx-4"> {/* Added mx-4 for horizontal spacing */}
                {new Date(transaction.time).toLocaleDateString()}{" "}
                {new Date(transaction.time).toLocaleTimeString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No transactions to display.</p>
        )}
      </div>
    </Card>
  );
};
