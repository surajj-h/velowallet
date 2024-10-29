"use client"

import { useState } from "react";
import { SidebarItem } from "../components/SidebarItem";

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex bg-[#F6E7FF]">
      <div className={`fixed lg:static z-20 transition-all duration-300 ease-in-out border-r-4 rounded border-[#FBF5FF] min-h-screen pt-10 ${isOpen ? "w-64" : "w-20"}`} >
        <div className="pb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="pl-5 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`
                block h-0.5 bg-slate-600 rounded-full transition-all duration-300
                ${isOpen ? "w-6" : "w-6"}
              `}></span>
              <span className={`
                block h-0.5 bg-slate-600 rounded-full transition-all duration-300
                ${isOpen ? "w-4" : "w-6"}
              `}></span>
              <span className={`
                block h-0.5 bg-slate-600 rounded-full transition-all duration-300
                ${isOpen ? "w-6" : "w-6"}
              `}></span>
            </div>
          </button>
        </div>
        <div>
          <SidebarItem href={"/dashboard"} icon={<HomeIcon />} isOpen={isOpen} title="Home" />
          <SidebarItem href={"/transfer"} icon={<TransferIcon />} isOpen={isOpen} title="Transfer" />
          <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} isOpen={isOpen} title="Transactions" />
          <SidebarItem href={"/p2ptransfer"} icon={<P2PIcon />} isOpen={isOpen} title="P2P transfer" />
        </div>
      </div>
      {children}
    </div>
  )
}

function P2PIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
}

function HomeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

}
