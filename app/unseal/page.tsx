"use client"

import { useState } from "react"

import DecryptForm from "@/components/decrypt-from"

const UnsealPage = () => {
  const [text, setText] = useState<string | null>(null)
  const [remainingReads, setRemainingReads] = useState<number | null>(null)

  return (
    <div className="container mx-auto mt-16 px-8 sm:mt-32">
      {text ? (
        <div className="mx-auto max-w-4xl">
          {remainingReads !== null ? (
            <div className="text-center text-sm text-zinc-600">
              {remainingReads > 0 ? (
                <p>
                  This document can be read{" "}
                  <span className="text-zinc-100">{remainingReads}</span> more
                  times.
                </p>
              ) : (
                <p className="text-zinc-400">
                  This was the last time this document could be read. It was
                  deleted from storage.
                </p>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <DecryptForm setText={setText} setRemainingReads={setRemainingReads} />
      )}
    </div>
  )
}

export default UnsealPage
