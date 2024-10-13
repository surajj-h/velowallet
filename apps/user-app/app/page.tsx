"use client"

import { Button } from "@repo/ui/button";
import { Appbar } from "@repo/ui/appbar"
import styles from "./page.module.css";
import { useBalance } from "@repo/store/useBalance";
import { signIn, useSession, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession()
  return (
    <div className="p-4">
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      User app
    </div>
  );
}
