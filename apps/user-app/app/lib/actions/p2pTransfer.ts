"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function p2pTransfer(phone: string, amount: number) {
  const session = await getServerSession(authOptions);
  const fromId = session?.user?.id;
  if (!fromId) {
    return {
      message: "Unauthorised request"
    }
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: phone
    }
  })

  if (!toUser) {
    return {
      success: false,
      message: "No user found"
    }
  }

  if (toUser.id == fromId) {
    return {
      success: false,
      message: "Cant transfer to own account"
    }
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(phone)} FOR UPDATE`;

      const fromUserBalance = await tx.balance.findUnique({
        where: { userId: Number(fromId) }
      })
      const fromBalance = fromUserBalance?.amount || 0;
      if (fromBalance < amount) {
        throw new Error("Insufficient funds")
      }

      await tx.balance.update({
        where: { userId: Number(fromId) },
        data: { amount: { decrement: amount } }
      })

      await tx.balance.update({
        where: { userId: Number(toUser.id) },
        data: { amount: { increment: amount } }
      })
    })
  } catch (error) {
    return {
      success: false
    }
  }

  return {
    success: true,
    message: "Transaction sucessfull"
  }
} 
