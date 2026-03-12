"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useCallback, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  submenu?: SubItem[]
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { label: "Zapatillas", href: "/zapatillas" },
  { label: "Ropa", href: "/ropa" },
  { label: "Accesorios", href: "/accesorios" },
]

// ---- Desktop nav link ----
function DesktopNavLink({ item }: { item: NavItem }) {
  const pathname = usePathname()

  return (
    <Link
      href={item.href}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        pathname === item.href || pathname.startsWith(item.href + "/")
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {item.label}
    </Link>
  )
}

// ---- Mobile nav item ----
function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem
  onClose: () => void
}) {
  const pathname = usePathname()

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
        pathname === item.href
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {item.label}
    </Link>
  )
}

// ---- Main header ----
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="VANTTI - Inicio">
          <span className="font-serif text-2xl font-bold tracking-widest text-foreground">
            VANTTI
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegacion principal" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <DesktopNavLink key={item.label} item={item} />
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Navegacion movil"
          className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden space-y-1"
        >
          {navItems.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              onClose={closeMobile}
            />
          ))}
        </nav>
      )}
    </header>
  )
}
