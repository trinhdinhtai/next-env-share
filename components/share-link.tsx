import CopyButton from "@/components/copy-button"

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

        <CopyButton text={link} copied={copied} setCopied={setCopied} />
      </div>

      <Button className="mt-8" variant="outline" onClick={() => setLink("")}>
        Share another
      </Button>
    </div>
  )
}

export default ShareLink
