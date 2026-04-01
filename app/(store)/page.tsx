import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, ShieldCheck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-foreground py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-serif text-5xl font-bold leading-tight text-background md:text-6xl lg:text-7xl tracking-tight">
            <span className="text-balance">Las zapatillas de los que saben</span>
          </h1>
          <p className="mt-6 font-sans text-lg font-light tracking-wide text-background/90 md:text-xl max-w-2xl mx-auto">
            Desde 42€. Envío gratis en 24-72h desde España. Pagas cuando lo recibes.
          </p>
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="border-2 border-background bg-transparent text-background hover:bg-background hover:text-foreground"
            >
              <Link href="/zapatillas">
                VER ZAPATILLAS
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <Truck className="h-6 w-6 text-foreground" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Envio Gratis
              </p>
              <p className="text-xs text-muted-foreground">
                24-72 horas
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <CreditCard className="h-6 w-6 text-foreground" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Pago Contra Reembolso
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
                Garantía de Calidad
              </p>
              <p className="text-xs text-muted-foreground">
                Compra con confianza
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <h2 className="text-center font-serif text-3xl font-bold text-foreground tracking-wide mb-12">
          POR QUÉ ELEGIRNOS
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="px-4 py-4 text-left text-foreground font-semibold w-1/3">Otras tiendas</th>
                <th className="px-4 py-4 text-center text-muted-foreground font-normal w-1/3"></th>
                <th className="px-4 py-4 text-right text-foreground font-semibold w-1/3">VANTTI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-4 text-foreground/70">Semanas de espera</td>
                <td className="px-4 py-4 text-center text-muted-foreground text-sm">Envío</td>
                <td className="px-4 py-4 text-right text-foreground font-semibold">24-72h desde España 🇪🇸</td>
              </tr>
              <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-4 text-foreground/70">Por adelantado, sin garantías</td>
                <td className="px-4 py-4 text-center text-muted-foreground text-sm">Pago</td>
                <td className="px-4 py-4 text-right text-foreground font-semibold">Pagas cuando lo recibes 📦</td>
              </tr>
              <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-4 text-foreground/70">No sabes lo que llega</td>
                <td className="px-4 py-4 text-center text-muted-foreground text-sm">Calidad</td>
                <td className="px-4 py-4 text-right text-foreground font-semibold">Calidad verificada antes de enviar ✓</td>
              </tr>
              <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-4 text-foreground/70">Soporte difícil de contactar</td>
                <td className="px-4 py-4 text-center text-muted-foreground text-sm">Atención</td>
                <td className="px-4 py-4 text-right text-foreground font-semibold">WhatsApp en español, respuesta inmediata</td>
              </tr>
              <tr className="hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-4 text-foreground/70">Complicadas o imposibles</td>
                <td className="px-4 py-4 text-center text-muted-foreground text-sm">Devoluciones</td>
                <td className="px-4 py-4 text-right text-foreground font-semibold">14 días sin coste</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-center font-semibold text-foreground mt-8 text-lg">
          Misma estética. Sin el riesgo. Sin la espera.
        </p>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-center font-serif text-3xl font-bold text-foreground tracking-wide">
          NUESTRAS CATEGORÍAS
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            { name: "Zapatillas", href: "/zapatillas" },
            { name: "Ropa", href: "/ropa" },
            { name: "Accesorios", href: "/accesorios" },
            { name: "Relojes", href: "/relojes" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex items-center justify-between rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-foreground"
            >
              <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
              <ArrowRight className="h-5 w-5 text-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Por Qué VANTTI Section */}
      <section className="bg-foreground px-4 py-20 text-background lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-bold tracking-wide">
            POR QUÉ VANTTI
          </h2>

          <p className="mt-8 font-sans text-base leading-relaxed text-balance">
            Somos una marca española que nació para darte el estilo que buscas sin los riesgos de comprar al otro lado del mundo. Almacén en España, entrega real en 24-72h.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-balance">
            No pedimos dinero por adelantado. Cuando el repartidor llama a tu puerta, tú decides si pagas. Así de simple.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-balance font-semibold">
            Las zapatillas de los que saben.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <h2 className="text-center font-serif text-4xl font-bold tracking-wide text-foreground">
          PREGUNTAS FRECUENTES
        </h2>

        <div className="mt-12 space-y-6">
          <div className="border-b border-border pb-6">
            <h3 className="text-lg font-semibold text-foreground">
              ¿Cómo funciona el pago contra reembolso?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Recibes tu pedido en casa y pagas al mensajero en el momento de la entrega. Sin tarjeta, sin riesgos.
            </p>
          </div>

          <div className="border-b border-border pb-6">
            <h3 className="text-lg font-semibold text-foreground">
              ¿Cuánto tarda en llegar mi pedido?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Todos nuestros pedidos se envían en un plazo de 24 a 72 horas desde la confirmación.
            </p>
          </div>

          <div className="border-b border-border pb-6">
            <h3 className="text-lg font-semibold text-foreground">
              ¿Puedo devolver el producto si no me convence?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Sí. Tienes 14 días para realizar una devolución sin coste adicional.
            </p>
          </div>

          <div className="pb-6">
            <h3 className="text-lg font-semibold text-foreground">
              ¿Es seguro comprar sin pagar por adelantado?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Completamente. Con el pago contra reembolso, solo pagas cuando tienes el producto en tus manos.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
