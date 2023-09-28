"use client"

import { useState } from "react"

import DecryptForm from "@/components/decrypt-from"

const UnsealPage = () => {
  const [text, setText] = useState<string | null>(null)

  return (
    <div className="container mx-auto mt-16 px-8 sm:mt-32">
      {text ? null : <DecryptForm setText={setText} />}
    </div>
  )
}

export default UnsealPage
