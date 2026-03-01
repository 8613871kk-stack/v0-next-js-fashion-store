import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, ShieldCheck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="text-center lg:text-left">
            <span className="mb-4 inline-block rounded-full bg-card/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
              Nueva Coleccion 2026
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              <span className="text-balance">Estilo para Todos</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              Descubre las mejores marcas a precios increibles.
              Envio gratis y pago contra reembolso en todos los pedidos.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-card text-foreground hover:bg-card/90"
              >
                <Link href="/zapatillas">
                  Ver Productos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/ropa">Explorar Ropa</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg lg:max-w-none">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new%20balance%209060%20color%20rosa-wfkGfBWuoYmEhHmdpJ2s25xz8c38Jq.jpeg"
              alt="New Balance 9060 Rosa"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <Truck className="h-6 w-6 text-foreground" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Envio Gratis
              </p>
              <p className="text-xs text-muted-foreground">
                24-48 horas
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <CreditCard className="h-6 w-6 text-foreground" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Contra Reembolso
              </p>
              <p className="text-xs text-muted-foreground">
                Paga al recibir
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="h-6 w-6 text-foreground" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                100% Seguro
              </p>
              <p className="text-xs text-muted-foreground">
                Compra con confianza
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-center font-serif text-3xl font-bold text-foreground">
          Nuestras Categorias
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
          Encuentra todo lo que necesitas para completar tu look
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            { name: "Zapatillas", href: "/zapatillas", image: "/images/zapatillas-nike.jpg" },
            { name: "Accesorios", href: "/accesorios", image: "/images/accesorio-gorra.jpg" },
            { name: "Ropa", href: "/ropa", image: "/images/ropa-chandal.jpg" },
            { name: "Relojes", href: "/relojes", image: "/images/reloj-luxury.jpg" },
            { name: "Perfumes", href: "/perfumes", image: "/images/perfume-luxury.jpg" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative aspect-square overflow-hidden rounded-lg bg-secondary"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-card">{cat.name}</h3>
                <span className="mt-1 flex items-center text-sm text-card/80">
                  Ver productos
                  <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
            <span className="text-balance">Ofertas que no te puedes perder</span>
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Hasta un 40% de descuento en toda la tienda. Envio gratis y pago
            contra reembolso en todos los pedidos.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-card text-foreground hover:bg-card/90"
          >
            <Link href="/zapatillas">
              Comprar Ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
