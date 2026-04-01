import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "VANTTI - Zapatillas desde 42€ | Envío Gratis 24-72h | Pagas al Recibir",
  description:
    "Zapatillas, ropa y accesorios de calidad desde 42€. Envío gratis desde España en 24-72h. Pagas cuando lo recibes. Sin riesgos, sin esperas.",
  keywords: [
    "zapatillas",
    "agente chino alternativa",
    "comprar zapatillas españa",
    "contra reembolso",
    "envio rapido zapatillas",
    "moda",
    "ropa",
    "accesorios",
    "tienda online",
    "españa",
    "envío rápido",
  ],
  openGraph: {
    title: "VANTTI - Zapatillas desde 42€ | Envío Gratis 24-72h | Pagas al Recibir",
    description:
      "Zapatillas, ropa y accesorios de calidad desde 42€. Envío gratis desde España en 24-72h. Pagas cuando lo recibes.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
