"use client"

import { Fragment, useState } from "react"

import ShareForm from "@/components/share-form"
import { Title } from "@/components/title"

const SharePage = () => {
  const [text, setText] = useState("")
  const [reads, setReads] = useState(999)

  const [ttl, setTtl] = useState(7)
  const [ttlMultiplier, setTtlMultiplier] = useState(60 * 60 * 24)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const [link, setLink] = useState("")

  return (
    <div className="container mx-auto mt-16 px-8 sm:mt-32">
      {link ? (
        <div className="mt-8 flex h-full w-full flex-col items-center justify-center md:mt-16 xl:mt-32">
          <Title>Share this link with others</Title>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <ShareForm />
        </div>
      )}
    </div>
  )
}

export default SharePage
