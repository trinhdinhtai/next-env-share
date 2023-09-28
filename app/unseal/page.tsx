"use client"

import { useState } from "react"

import DecryptForm from "@/components/decrypt-from"
import DecryptedText from "@/components/decrypted-text"

const UnsealPage = () => {
  const [text, setText] = useState<string | null>(null)
  const [remainingReads, setRemainingReads] = useState<number | null>(null)

  return (
    <div className="container mx-auto mt-16 px-8 sm:mt-32">
      {text ? (
        <DecryptedText text={text} remainingReads={remainingReads} />
      ) : (
        <DecryptForm setText={setText} setRemainingReads={setRemainingReads} />
      )}
    </div>
  )
}

export default UnsealPage
