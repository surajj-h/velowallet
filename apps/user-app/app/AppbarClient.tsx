"use client"

import { Appbar } from "@repo/ui/appbar"
import { signIn, signOut, useSession, } from "next-auth/react"
import { useState, useEffect } from "react"

export function AppbarClient() {
  const session = useSession()
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignout = async () => {
    await signOut({ callbackUrl: "/api/auth/signin" })
  }

  return <div className="fixed top-0 left-0 w-full z-50">
    <Appbar onSignin={signIn} onSignout={handleSignout}
      user={session.data?.user} isScrolled={isScrolled} />
  </div>
}
