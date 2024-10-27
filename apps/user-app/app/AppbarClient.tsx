"use client"

import { Appbar } from "@repo/ui/appbar"
import { signIn, signOut, useSession, } from "next-auth/react"

export function AppbarClient() {
  const session = useSession()

  const handleSignout = async () => {
    await signOut({ callbackUrl: "/api/auth/signin" })
  }

  return <div>
    <Appbar onSignin={signIn} onSignout={handleSignout}
      user={session.data?.user} />
  </div>
}
