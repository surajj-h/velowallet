"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/text-input";
import { createOnRampTransactions } from "../lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [{
  name: "HDFC Bank",
  redirectUrl: "https://netbanking.hdfcbank.com"
}, {
  name: "Axis Bank",
  redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = ({ className }: { className: string }) => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")
  const [amount, setAmount] = useState(0)

  return <Card title="Add Money" className={className}>
    <div className="w-full">
      <TextInput label={"Amount"} placeholder={"Amount"} onChange={(e) => {
        setAmount(Number(e))
      }} />
      <div className="py-4 text-left">
        Bank
      </div>
      <Select onSelect={(value) => {
        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
      }} options={SUPPORTED_BANKS.map(x => ({
        key: x.name,
        value: x.name
      }))} />
      <div className="flex justify-center pt-4">
        <Button color="#FFFFFF" onClick={async () => {
          await createOnRampTransactions(provider, amount)
          window.location.href = redirectUrl || "";
        }}>
          Add Money
        </Button>
      </div>
    </div>
  </Card>
}


