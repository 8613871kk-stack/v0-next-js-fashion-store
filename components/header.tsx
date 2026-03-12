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
  {
    label: "Zapatillas",
    href: "/zapatillas",
    submenu: [
      { label: "Dior", href: "/zapatillas#dior" },
      { label: "New Balance", href: "/zapatillas#new-balance" },
      { label: "Nike", href: "/zapatillas#nike" },
      { label: "Asics", href: "/zapatillas#asics" },
      { label: "Amiri", href: "/zapatillas#amiri" },
      { label: "Louis Vuitton", href: "/zapatillas#louis-vuitton" },
    ],
  },
  {
    label: "Ropa",
    href: "/ropa",
    submenu: [
      { label: "Chándal", href: "/ropa#chandal" },
      { label: "Nike", href: "/ropa#chandal-nike" },
      { label: "Lacoste", href: "/ropa#chandal-lacoste" },
      { label: "Armani", href: "/ropa#chandal-armani" },
      { label: "Burberry Verano", href: "/ropa#conjunto-verano-burberry" },
    ],
  },
  {
    label: "Accesorios",
    href: "/accesorios",
    submenu: [
      { label: "Louis Vuitton", href: "/accesorios#louis-vuitton" },
      { label: "Gucci", href: "/accesorios#gucci" },
      { label: "Prada", href: "/accesorios#prada" },
      { label: "Lacoste", href: "/accesorios#lacoste" },
    ],
  },
]

// ---- Desktop nav link with dropdown ----
function DesktopNavLink({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSubClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const [pagePath, anchor] = href.split("#")
      const isSamePage = pathname === pagePath || (pagePath === "" && pathname === "/")

      if (isSamePage && anchor) {
        e.preventDefault()
        const el = document.getElementById(anchor)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }
      setIsOpen(false)
    },
    [pathname]
  )

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => item.submenu && setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          pathname === item.href || pathname.startsWith(item.href + "/")
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        {item.label}
        {item.submenu && (
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        )}
      </Link>

      {/* Desktop Dropdown */}
      {item.submenu && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-1 min-w-[200px] origin-top rounded-lg border border-border bg-white shadow-lg transition-all duration-250 ease-out",
            isOpen
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          )}
          style={{
            transform: isOpen
              ? "translateY(0) scaleY(1)"
              : "translateY(-8px) scaleY(0.95)",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <ul className="py-1">
            {item.submenu.map((sub) => (
              <li key={sub.href}>
                <a
                  href={sub.href}
                  onClick={(e) => handleSubClick(e, sub.href)}
                  className="block px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-800 transition-colors hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                >
                  {sub.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ---- Mobile nav item with dropdown ----
function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem
  onClose: () => void
}) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const [pagePath, anchor] = href.split("#")
      const isSamePage = pathname === pagePath || (pagePath === "" && pathname === "/")

      if (isSamePage && anchor) {
        e.preventDefault()
        const el = document.getElementById(anchor)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }
      onClose()
    },
    [pathname, onClose]
  )

  if (!item.submenu) {
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

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className={cn(
          "w-full flex items-center justify-between rounded-md px-3 py-3 text-sm font-semibold tracking-wide transition-colors",
          isExpanded
            ? "bg-secondary text-foreground"
            : "text-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="ml-4 mt-1 mb-1 space-y-0.5 border-l-2 border-border pl-3">
          {item.submenu.map((sub) => (
            <li key={sub.href}>
              <a
                href={sub.href}
                onClick={(e) => handleSubClick(e, sub.href)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground active:bg-secondary"
              >
                <span className="h-1 w-1 rounded-full bg-foreground/30 shrink-0" />
                {sub.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="VANTTI - Inicio">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vantti%20logo-XSxbuVEpqqETiV2jtNWtcgsMJwGtIg.png"
            alt="VANTTI"
            width={48}
            height={48}
            className="h-9 w-auto md:h-12"
            priority
          />
          <span className="hidden font-serif text-2xl font-bold tracking-widest text-foreground md:inline">
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
          className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden"
        >
          <div className="space-y-1">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                onClose={closeMobile}
              />
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
