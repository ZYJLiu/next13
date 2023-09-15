"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  createQR,
  encodeURL,
  TransactionRequestURLFields,
  findReference,
  FindReferenceError,
} from "@solana/pay"
import { Keypair } from "@solana/web3.js"
import { useConnection } from "@solana/wallet-adapter-react"
import { useToast } from "@/components/ui/use-toast"

const QRCode = ({ route }: { route: string }) => {
  const { connection } = useConnection()
  const qrRef = useRef<HTMLDivElement>(null)
  const reference = useMemo(() => Keypair.generate().publicKey, [])
  const mostRecentNotifiedTransaction = useRef<string | undefined>(undefined)
  const { toast } = useToast()

  useEffect(() => {
    const apiUrl = `${window.location.protocol}//${
      window.location.host
    }/api/${route}?reference=${reference.toBase58()}`

    const urlParams: TransactionRequestURLFields = {
      link: new URL(apiUrl),
    }
    const solanaUrl = encodeURL(urlParams)
    const qr = createQR(solanaUrl, 400, "white")

    if (qrRef.current) {
      qrRef.current.innerHTML = ""
      qr.append(qrRef.current)
    }
  }, [reference, route])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const signatureInfo = await findReference(connection, reference, {
          until: mostRecentNotifiedTransaction.current,
          finality: "confirmed",
        })
        mostRecentNotifiedTransaction.current = signatureInfo.signature

        toast({
          title: "Success",
          description: (
            <a
              href={`https://explorer.solana.com/tx/${signatureInfo.signature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Solana Explorer
            </a>
          ),
        })
      } catch (e) {
        if (e instanceof FindReferenceError) {
          // No transaction found yet, ignore this error
          return
        }
        console.error("Unknown error", e)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [reference, connection, toast])

  return <div ref={qrRef} className="overflow-hidden rounded-2xl" />
}

export default QRCode
