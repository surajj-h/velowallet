"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon, isOpen }: { href: string; title: string; icon: React.ReactNode, isOpen: boolean }) => {
  const router = useRouter();
  const pathname = usePathname()
  const selected = pathname === href

  return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2.5 pl-5`} onClick={() => {
    router.push(href);
  }}>
    <div className="pr-4">
      {icon}
    </div>{isOpen &&
      <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
        {title}
      </div>}
  </div>
}
