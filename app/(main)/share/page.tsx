"use client"

import { useState } from "react"

import ShareForm from "@/components/share-form"
import ShareLink from "@/components/share-link"

const SharePage = () => {
  const [copied, setCopied] = useState(false)
  const [link, setLink] = useState("")

  return (
    <div className="container mx-auto mt-16 px-8 sm:mt-32">
      {link ? (
        <ShareLink
          link={link}
          copied={copied}
          setCopied={setCopied}
          setLink={setLink}
        />
      ) : (
        <ShareForm setLink={setLink} setCopied={setCopied} />
      )}
    </div>
  )
}

export default SharePage
