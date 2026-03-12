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
  title: "VANTTI - Zapatillas de Diseño y Lujo Premium",
  description:
    "VANTTI: El nuevo estándar del lujo en zapatillas de diseño premium. Envío 24-72 horas. Pago contra reembolso. Compra directa desde España.",
  keywords: [
    "zapatillas",
    "zapatillas premium",
    "lujo",
    "moda",
    "ropa",
    "accesorios",
    "tienda online",
    "españa",
    "envío rápido",
  ],
  openGraph: {
    title: "VANTTI - Zapatillas de Diseño y Lujo Premium",
    description:
      "Zapatillas de diseño premium. Envío 24-72 horas. Pago contra reembolso.",
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
