import { Copy, CopyCheck } from "lucide-react"

import { Title } from "./title"
import { Button } from "./ui/button"

interface ShareLinkProps {
  link: string
  setLink: (link: string) => void
  copied: boolean
  setCopied: (copied: boolean) => void
}

const ShareLink = ({ link, setLink, copied, setCopied }: ShareLinkProps) => {
  return (
    <div className="mt-8 flex h-full w-full flex-col items-center justify-center md:mt-16 xl:mt-32">
      <Title>Share this link with others</Title>

      <div className="relative mt-16 flex flex-grow items-stretch focus-within:z-10">
        <pre className="rounded border border-zinc-600 bg-transparent px-4 py-3 text-center font-mono text-zinc-100 focus:border-zinc-100/80 focus:ring-0 sm:text-sm">
          {link}
        </pre>

        <button
          type="button"
          className="hover relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 duration-150 hover:bg-white hover:text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          onClick={() => {
            navigator.clipboard.writeText(link)
            setCopied(true)
          }}
        >
          {copied ? (
            <CopyCheck className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Copy className="h-5 w-5" aria-hidden="true" />
          )}{" "}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <Button className="mt-16" onClick={() => setLink("")}>
        Share new ENV
      </Button>
    </div>
  )
}

export default ShareLink
