import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AddMoney } from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/OnRampTransactionsCard";

interface OnRampTransaction {
  token: string;
  startTime: Date;
  amount: number;
  status: string;
  provider: string;
}

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id)
    }
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  }
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id)
    }
  });
  return txns.map((t: OnRampTransaction) => ({
    token: t.token,
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider
  }))
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return <div className="w-screen">
    <div className="text-5xl text-[#AB2BF2] pt-20 pl-8 mb-8 font-semibold">
      Bank Transfer
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
      <div>
        <AddMoney className="bg-slate-50" />
      </div>
      <div>
        <BalanceCard amount={balance.amount} locked={balance.locked} className="bg-slate-50" />
        <div className="pt-4">
          <OnRampTransactions transactions={transactions} className="bg-slate-50" />
        </div>
      </div>
    </div>
  </div>
}
