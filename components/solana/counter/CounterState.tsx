import { useEffect, useState } from "react"
import { useConnection } from "@solana/wallet-adapter-react"
import { program, counterPDA, CounterData } from "@/utils/anchor/setup"

export default function CounterState() {
  const { connection } = useConnection()
  const [counterData, setCounterData] = useState<CounterData | null>(null)

  useEffect(() => {
    // Fetch initial account data
    program.account.counter.fetch(counterPDA).then((data) => {
      setCounterData(data)
    })

    // Subscribe to the state PDA account change
    const subscriptionId = connection.onAccountChange(
      counterPDA,
      (accountInfo) => {
        setCounterData(
          program.coder.accounts.decode("counter", accountInfo.data)
        )
      }
    )

    return () => {
      // Unsubscribe from the account change subscription
      connection.removeAccountChangeListener(subscriptionId)
    }
  }, [program])

  return <p className="text-lg">Count: {counterData?.count?.toString()}</p>
}
