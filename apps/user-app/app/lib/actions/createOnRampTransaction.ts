"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransactions(provider: string, amount: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthorised request"
    }
  }

  const token = Math.floor((Math.random() * 1000000000000)).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider: provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session?.user?.id),
      amount: amount * 100
    }
  });

  return {
    message: "Done"
  }
}
