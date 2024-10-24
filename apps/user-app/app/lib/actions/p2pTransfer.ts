"use server"

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { Prisma } from "@prisma/client"

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
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(phone)} FOR UPDATE`;

      const fromUserBalance = await tx.balance.findUnique({
        where: { userId: Number(fromId) }
      })
      const fromBalance = fromUserBalance?.amount || 0;

      if (fromBalance < amount * 100) {
        throw new Error("Insufficient funds")
      }

      await tx.balance.update({
        where: { userId: Number(fromId) },
        data: { amount: { decrement: amount * 100 } }
      })

      await tx.balance.update({
        where: { userId: Number(toUser.id) },
        data: { amount: { increment: amount * 100 } }
      })

      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(fromId),
          toUserId: toUser.id,
          amount: amount * 100,
          timestamp: new Date()
        }
      })
    })
  } catch (error) {
    return {
      success: false,
      amount
    }
  }

  return {
    success: true,
    message: "Transaction sucessfull"
  }
} 
