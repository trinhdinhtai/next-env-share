import Link from "next/link"

const Footer = () => {
  return (
    <footer className="inset-2x-0 bottom-0 border-t border-zinc-500/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-12 text-center text-sm text-zinc-700 lg:px-8">
        <p>
          Built by{" "}
          <Link
            href="https://twitter.com/taitd_dev"
            className="font-semibold duration-150 hover:text-zinc-200"
          >
            @taitd
          </Link>{" "}
        </p>
      </div>
    </footer>
  )
}

export default Footer
