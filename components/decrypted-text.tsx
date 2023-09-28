import { Fragment, useState } from "react"
import Link from "next/link"

import CopyButton from "@/components/copy-button"

interface DecryptFormProps {
  text: string
  remainingReads: number | null
}

const DecryptedText = ({ text, remainingReads }: DecryptFormProps) => {
  const [copied, setCopied] = useState(false)

  return (
    <div className="mx-auto max-w-4xl">
      {remainingReads !== null ? (
        <div className="text-center text-sm text-muted-foreground">
          {remainingReads > 0 ? (
            <p>
              This document can be read{" "}
              <span className="text-zinc-100">{remainingReads}</span> more
              times.
            </p>
          ) : (
            <p className="text-zinc-400">
              This was the last time this document could be read. It was deleted
              from storage.
            </p>
          )}
        </div>
      ) : null}

      <pre className="mt-8 rounded border border-zinc-600 bg-transparent px-4 py-3 text-left font-mono text-zinc-100 focus:border-zinc-100/80 focus:ring-0  sm:text-sm">
        <div className="flex items-start px-1 text-sm">
          <div
            aria-hidden="true"
            className="select-none border-r border-zinc-300/5 pr-4 font-mono text-zinc-700"
          >
            {Array.from({
              length: text.split("\n").length,
            }).map((_, index) => (
              <Fragment key={index}>
                {(index + 1).toString().padStart(2, "0")}
                <br />
              </Fragment>
            ))}
          </div>
          <div className="overflow-auto px-4">
            <pre className="flex">
              <code className="text-left">{text}</code>
            </pre>
          </div>
        </div>
      </pre>

      <div className="mt-4 flex items-center justify-end gap-4">
        <Link
          href="/share"
          type="button"
          className="relative -ml-px inline-flex items-center space-x-2 rounded border border-zinc-300/40 px-4 py-2 text-sm font-medium text-zinc-300 duration-150 hover:border-zinc-300 hover:text-white focus:outline-none"
        >
          Share another
        </Link>

        <CopyButton text={text} copied={copied} setCopied={setCopied} />
      </div>
    </div>
  )
}

export default DecryptedText
