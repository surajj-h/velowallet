import { NextResponse } from "next/server";
//@ts-ignore
import client from "@repo/db/client"

export const GET = async () => {
  const user = await client.user.findMany({})
  return NextResponse.json({
    msg: user
  })
}

