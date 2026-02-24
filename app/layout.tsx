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
  title: "RopaModa - Moda para Todos",
  description:
    "Tienda de moda online con zapatillas, ropa, accesorios, relojes y perfumes. Envio gratis en 2-3 dias. Pago contra reembolso.",
  keywords: [
    "moda",
    "zapatillas",
    "ropa",
    "accesorios",
    "relojes",
    "perfumes",
    "tienda online",
    "espana",
  ],
  openGraph: {
    title: "RopaModa - Moda para Todos",
    description:
      "Tienda de moda online con envio gratis y pago contra reembolso.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
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
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
