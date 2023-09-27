import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-8 md:gap-16 md:pb-16 xl:pb-24">
      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center px-8 sm:mt-0 sm:min-h-screen sm:px-0">
        <div>
          <h1 className="bg-gradient-to-t from-zinc-100/50 to-white bg-clip-text py-4 text-center text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
            Share Environment Variables Securely
          </h1>

          <p className="mt-6 leading-5 text-muted-foreground sm:text-center">
            Your document is encrypted in your browser before being stored for a
            limited period of time and read operations. Unencrypted data never
            leaves your browser.
          </p>

          <div className="mx-auto mt-8 flex flex-col justify-center gap-4 sm:max-w-lg sm:flex-row ">
            <Link
              href="/share"
              className="hover:drop-shadow-cta inline-block space-x-2 rounded bg-zinc-50  px-4 py-1.5 text-base font-semibold leading-7 text-zinc-800 ring-1 ring-transparent  transition-all duration-150 hover:bg-zinc-900/20 hover:text-zinc-100 hover:ring-zinc-600/80  sm:w-1/2 sm:text-center md:py-2"
            >
              <span>Share</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
