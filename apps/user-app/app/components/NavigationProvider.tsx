"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import { AppbarClient } from "../AppbarClient";

export default function NavigationProvider({
  children
}: {
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment();
  const isAuthPage = segment === "auth";

  return <>
    {!isAuthPage && <AppbarClient />}
    {children}
  </>
}
