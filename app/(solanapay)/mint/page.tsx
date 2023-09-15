"use client"
import MintButton from "@/components/solana/mint/MintButton"
import QRCode from "@/components/solana/QRCode"
export default function Mint() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <MintButton />
      <QRCode route="mint" />
    </div>
  )
}
