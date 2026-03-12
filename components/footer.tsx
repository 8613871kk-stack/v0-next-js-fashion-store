import { Instagram, Facebook } from "lucide-react"

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9a8.2 8.2 0 004.79 1.53V7.1a4.85 4.85 0 01-1.02-.41z"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.693.841 5.286 2.436 7.453L2.481 21.7l2.658-.859c2.02 1.083 4.408 1.855 6.89 1.855 5.487 0 9.86-4.039 9.986-9.748.023-.23.023-.46 0-.69-.125-5.633-4.544-10.159-10.033-10.159"/>
  </svg>
)

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="text-center">
          <p className="font-serif text-3xl font-bold tracking-widest">VANTTI</p>
          <p className="mt-6 text-sm leading-relaxed text-balance">
            Redefiniendo el estándar del lujo en zapatillas de diseño.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-opacity hover:opacity-70"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@vantti_shop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-opacity hover:opacity-65 duration-200"
            >
              <TikTokIcon />
            </a>
            <a
              href="https://wa.me/34643154824"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-opacity hover:opacity-65 duration-200"
            >
              <WhatsAppIcon />
            </a>
          </div>

          <div className="mt-8 border-t border-foreground/20 pt-8">
            <p className="text-xs">© 2026 VANTTI. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
