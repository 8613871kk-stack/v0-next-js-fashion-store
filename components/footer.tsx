import { Truck, ShieldCheck, CreditCard, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Envio Rapido
              </h4>
              <p className="text-sm text-muted-foreground">
                Entrega en 24-48 horas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Pago Contra Reembolso
              </h4>
              <p className="text-sm text-muted-foreground">
                Pagas al recibir tu pedido
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Compra Segura
              </h4>
              <p className="text-sm text-muted-foreground">
                Tus datos 100% protegidos
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
              <Clock className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Atencion al Cliente
              </h4>
              <a
                href="https://wa.me/34662568296?text=Hola%2C%20necesito%20ayuda%20con%20mi%20pedido%20en%20RopaModa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Disponible por WhatsApp 24/7
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8 text-center">
          <p className="font-serif text-lg font-bold text-foreground">RopaModa</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Moda accesible para todos. Envio gratis a toda Espana.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            {"© 2026 RopaModa. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
