import { Copy, CopyCheck } from "lucide-react"

interface CopyButtonProps {
  text: string
  copied: boolean
  setCopied: (copied: boolean) => void
}

const CopyButton = ({ text: link, copied, setCopied }: CopyButtonProps) => {
  return (
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
  )
}

export default CopyButton
