import { useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { getAssociatedTokenAddressSync } from "@solana/spl-token"
import { program, mintPDA } from "@/utils/anchor/setup"
import { Button } from "@nextui-org/button"
import { useToast } from "@/components/ui/use-toast"

export default function IncrementButton() {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const onClick = async () => {
    if (!publicKey) return

    setIsLoading(true)

    try {
      const associatedTokenAccount = getAssociatedTokenAddressSync(
        mintPDA,
        publicKey
      )

      const transaction = await program.methods
        .increment()
        .accounts({
          user: publicKey,
          tokenAccount: associatedTokenAccount,
        })
        .transaction()

      const transactionSignature = await sendTransaction(
        transaction,
        connection
      )

      toast({
        title: "Success",
        description: (
          <a
            href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`}
            target="_blank"
          >
            View on Solana Explorer
          </a>
        ),
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className="w-24"
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={!publicKey}
    >
      {isLoading ? "" : "Increment"}
    </Button>
  )
}
