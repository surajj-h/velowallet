"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/text-input"
import { useState } from "react"
import { p2pTransfer } from "../lib/actions/p2pTransfer"

export const P2pTransferCard = ({ className
}:
  {
    className: string
  }) => {

  const [number, setNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")

  return <Card title="Send" className={className}>
    <div className="w-full">
      <div className="min-w-72 flex-col items-center justify-center">
        <TextInput label="Mobile number" placeholder="9xxxxxxxxx" onChange={(val) => setNumber(val)} />
        <TextInput label="Amount" placeholder="Enter amount" onChange={(val) => setAmount(val)} />
        <div className="flex justify-center pt-3">
          {message && (
            <div
              className={`${message === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                } rounded-md p-2 text-center w-full max-w-md shadow-md`}
            >
              {message === "success" ? "Transaction successful" : "Transaction failed"}
            </div>
          )}
        </div>
        <div className="flex pt-3 justify-center">
          <Button onClick={async () => {
            const response = await p2pTransfer(number, Number(amount))
            if (response.success === true) setMessage("success")
            else setMessage("1")
          }} >Send</Button>
        </div>
      </div>

    </div>
  </Card>
}
