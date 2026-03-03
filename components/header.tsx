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
      { label: "Nocta", href: "/zapatillas#nocta" },
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
  {
    label: "Perfumes",
    href: "/perfumes",
    submenu: [
      { label: "Blue Intense", href: "/perfumes#blue-intense" },
      { label: "Sauvage Style", href: "/perfumes#sauvage-style" },
      { label: "Good Girl", href: "/perfumes#good-girl" },
      { label: "One Million", href: "/perfumes#one-million" },
      { label: "Coco Mademoiselle", href: "/perfumes#coco-mademoiselle" },
      { label: "Acqua Di Gio", href: "/perfumes#acqua-di-gio" },
    ],
  },
  {
    label: "Relojes",
    href: "/relojes",
    submenu: [
      { label: "Submariner", href: "/relojes#submariner-style" },
      { label: "Daytona", href: "/relojes#daytona-style" },
      { label: "DateJust", href: "/relojes#datejust-style" },
      { label: "Royal Oak", href: "/relojes#royal-oak-style" },
      { label: "Nautilus", href: "/relojes#nautilus-style" },
      { label: "Santos", href: "/relojes#santos-style" },
    ],
  },
]

// ---- Desktop dropdown ----
function DesktopDropdown({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        containerRef.current?.querySelector("button")?.focus()
      }
    },
    [onClose]
  )

  // Navigate to section, handling same-page smooth scroll
  const handleSubClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const [pagePath, anchor] = href.split("#")
      const isSamePage = pathname === pagePath

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

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onKeyDown={handleKeyDown}
    >
      <Link
        href={item.href}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={cn(
          "rounded-md px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1",
          pathname === item.href || pathname.startsWith(item.href + "/")
            ? "bg-primary text-primary-foreground"
            : "text-foreground/70 hover:bg-secondary hover:text-foreground"
        )}
      >
        {item.label}
        {item.submenu && (
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")}
            aria-hidden="true"
          />
        )}
      </Link>

      {item.submenu && (
        <div
          role="menu"
          aria-label={`Submenu de ${item.label}`}
          className={cn(
            "absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-lg border border-border bg-card shadow-md transition-all duration-150 origin-top",
            isOpen
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          )}
        >
          <ul className="py-1">
            {item.submenu.map((sub) => (
              <li key={sub.href} role="none">
                <a
                  href={sub.href}
                  role="menuitem"
                  onClick={(e) => handleSubClick(e, sub.href)}
                  className="block px-4 py-2 text-sm text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors first:rounded-t-lg last:rounded-b-lg focus:bg-secondary focus:text-foreground focus:outline-none"
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

// ---- Mobile accordion item ----
function MobileNavItem({
  item,
  isExpanded,
  onToggle,
  onClose,
}: {
  item: NavItem
  isExpanded: boolean
  onToggle: () => void
  onClose: () => void
}) {
  const pathname = usePathname()

  const handleSubClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const [pagePath, anchor] = href.split("#")
      const isSamePage = pathname === pagePath

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
            : "text-foreground/70 hover:bg-secondary hover:text-foreground"
        )}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`mobile-sub-${item.label}`}
        className={cn(
          "w-full text-left flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
          isExpanded
            ? "bg-secondary text-foreground"
            : "text-foreground/70 hover:bg-secondary hover:text-foreground"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {isExpanded && (
        <ul id={`mobile-sub-${item.label}`} className="ml-3 mt-1 space-y-0.5 border-l border-border pl-3">
          {item.submenu.map((sub) => (
            <li key={sub.href}>
              <a
                href={sub.href}
                onClick={(e) => handleSubClick(e, sub.href)}
                className="block rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors"
              >
                {sub.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ---- Main header ----
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [expandedMobile, setExpandedMobile] = useState<Set<string>>(new Set())

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setExpandedMobile(new Set())
  }, [])

  const toggleMobileItem = useCallback((label: string) => {
    setExpandedMobile((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }, [])

  // Close desktop dropdown on route change
  useEffect(() => {
    setOpenDropdown(null)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="RopaModa - Inicio">
          <Image
            src="/images/logo.jpg"
            alt="RopaModa logo"
            width={40}
            height={40}
            className="rounded-md"
            priority
          />
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            RopaModa
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegacion principal" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) =>
            item.submenu ? (
              <DesktopDropdown
                key={item.label}
                item={item}
                isOpen={openDropdown === item.label}
                onOpen={() => setOpenDropdown(item.label)}
                onClose={() => setOpenDropdown(null)}
              />
            ) : (
              <DesktopDropdown
                key={item.label}
                item={item}
                isOpen={false}
                onOpen={() => {}}
                onClose={() => {}}
              />
            )
          )}
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
          className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden space-y-1"
        >
          {navItems.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              isExpanded={expandedMobile.has(item.label)}
              onToggle={() => toggleMobileItem(item.label)}
              onClose={closeMobile}
            />
          ))}
        </nav>
      )}
    </header>
  )
}
