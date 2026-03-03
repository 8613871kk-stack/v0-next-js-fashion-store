"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavDropdown {
  label: string
  href: string
  submenu?: { label: string; href: string }[]
}

const navItems: (NavDropdown | { href: string; label: string })[] = [
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
      { label: "Nike", href: "/ropa#nike" },
      { label: "Lacoste", href: "/ropa#lacoste" },
      { label: "Armani", href: "/ropa#armani" },
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
    label: "Relojes",
    href: "/relojes",
    submenu: [
      { label: "Rolex", href: "/relojes#rolex" },
      { label: "Omega", href: "/relojes#omega" },
      { label: "Tag Heuer", href: "/relojes#tag-heuer" },
    ],
  },
  {
    label: "Perfumes",
    href: "/perfumes",
    submenu: [
      { label: "Dior", href: "/perfumes#dior" },
      { label: "Chanel", href: "/perfumes#chanel" },
      { label: "Guerlain", href: "/perfumes#guerlain" },
    ],
  },
]

function NavDropdownMenu({ item, isOpen, onOpenChange }: { item: NavDropdown; isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <div className="relative group">
      <button
        onClick={() => onOpenChange(!isOpen)}
        className={cn(
          "rounded-md px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1",
          isOpen ? "bg-secondary text-foreground" : "text-foreground/70 group-hover:bg-secondary group-hover:text-foreground"
        )}
      >
        {item.label}
        {item.submenu && <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />}
      </button>

      {item.submenu && (
        <div
          className={cn(
            "absolute left-0 mt-0 w-48 rounded-md border border-border bg-card shadow-lg transition-opacity duration-200",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          )}
        >
          {item.submenu.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={() => onOpenChange(false)}
              className="block px-4 py-2.5 text-sm text-foreground/70 hover:bg-secondary hover:text-foreground first:rounded-t-md last:rounded-b-md transition-colors"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<Set<string>>(new Set())

  const toggleMobileDropdown = (label: string) => {
    const newSet = new Set(mobileOpenDropdowns)
    if (newSet.has(label)) {
      newSet.delete(label)
    } else {
      newSet.add(label)
    }
    setMobileOpenDropdowns(newSet)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
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

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <div key={item.label}>
              {"submenu" in item ? (
                <NavDropdownMenu
                  item={item as NavDropdown}
                  isOpen={openDropdown === item.label}
                  onOpenChange={(open) => setOpenDropdown(open ? item.label : null)}
                />
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-card px-4 pb-4 md:hidden space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              {"submenu" in item ? (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className={cn(
                      "w-full text-left block rounded-md px-3 py-2.5 text-sm font-medium transition-colors flex items-center justify-between",
                      mobileOpenDropdowns.has(item.label)
                        ? "bg-secondary text-foreground"
                        : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", mobileOpenDropdowns.has(item.label) && "rotate-180")}
                    />
                  </button>
                  {mobileOpenDropdowns.has(item.label) && item.submenu && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => {
                            setMobileOpen(false)
                            setMobileOpenDropdowns(new Set())
                          }}
                          className="block rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-secondary hover:text-foreground"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  )
}
