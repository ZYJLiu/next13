"use client"
import CounterState from "@/components/solana/counter/CounterState"
import IncrementButton from "@/components/solana/counter/IncrementButton"
import QRCode from "@/components/solana/QRCode"

export default function Counter() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <IncrementButton />
      <QRCode route="increment" />
      <CounterState />
    </div>
  )
}
