import prisma from "@repo/db/client";
import { AllTransactions } from "../../components/AllTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

interface UserTransaction {
  time: Date;
  amount: number;
  from: string;
  to: string;
  fromNumber: string;
  toNumber: string;
}

async function GetUserTransactions(): Promise<UserTransaction[]> {
  const session = await getServerSession(authOptions);
  const userNumber = session?.user?.email
  const user = await prisma.user.findFirst({
    where: {
      number: userNumber
    }
  })
  const userId = user?.id;

  const txns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    },
    include: {
      fromUser: true,
      toUser: true
    },
    orderBy: {
      timestamp: 'desc'
    }
  });
  return txns.map((txn) => ({
    time: txn.timestamp,
    amount: txn.amount,
    from: txn.fromUser.name ?? "Unknown",
    to: txn.toUser.name ?? "Unknown",
    fromNumber: txn.fromUser.number ?? "Unknown",
    toNumber: txn.toUser.number ?? "Unknown"
  }));
}

export default async function TransactionsPage() {
  try {
    const userTransactions = await GetUserTransactions();

    return (
      <div className="pt-28">
        <AllTransactions className="bg-slate-50" transactions={userTransactions} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return <div>Error loading transactions</div>;
  }
}
