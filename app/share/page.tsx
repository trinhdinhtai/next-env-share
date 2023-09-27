"use client"

import { useState } from "react"

import ShareForm from "@/components/share-form"
import { Title } from "@/components/title"

const SharePage = () => {
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
          <ShareForm setLink={setLink} setCopied={setCopied} />
        </div>
      )}
    </div>
  )
}

export default SharePage
