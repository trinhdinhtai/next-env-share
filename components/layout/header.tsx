"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const navigationLinks = [
  {
    name: "Share",
    href: "/share",
  },
  {
    name: "Unseal",
    href: "/unseal",
  },
] satisfies { name: string; href: string; external?: boolean }[]

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="top-0 z-30 w-full border-b bg-background/70 px-4 backdrop-blur sm:sticky">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-2 pt-6 sm:h-20 sm:flex-row sm:pt-0">
          <Link
            href="/"
            className="text-2xl font-semibold text-zinc-100 duration-150 hover:text-white"
          >
            EnvShare
          </Link>

          {/* Desktop navigation */}
          <nav className="flex grow items-center">
            <ul className="flex grow flex-wrap items-center justify-end gap-4">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className={`flex items-center px-3 py-2 text-sm duration-150 hover:text-zinc-50 sm:text-base
                    ${
                      pathname === link.href ? "text-zinc-200" : "text-zinc-400"
                    }`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "text-sm sm:text-base"
                )}
              >
                Login
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
