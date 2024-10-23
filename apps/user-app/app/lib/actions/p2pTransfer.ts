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
      message: "No user found"
    }
  }

  if (toUser.id == fromId) {
    return {
      message: "Cant transfer to own account"
    }
  }

  await prisma.$transaction(async (tx) => {
    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(fromId) }
    })

    if (!fromBalance || fromBalance?.amount < amount) {
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
  })

  return {
    message: "Transaction sucessfull"
  }

} 
