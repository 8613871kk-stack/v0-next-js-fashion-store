import { notFound } from "next/navigation"
import { zapatillasData, ropaData } from "@/lib/data"
import { Product } from "@/lib/types"
import { ProductDetailClient } from "./product-detail-client"
import type { Metadata } from "next"

function getAllProducts(): Product[] {
  const zapatillas = Object.values(zapatillasData).flat()
  const ropa = Object.values(ropaData).flatMap((marcas) =>
    Object.values(marcas).flat()
  )
  return [...zapatillas, ...ropa]
}

function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug || p.id === slug)
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((p) => ({ slug: p.slug ?? p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} - RopaModa`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} - RopaModa`,
      description: product.description.slice(0, 160),
      images: [product.image],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
