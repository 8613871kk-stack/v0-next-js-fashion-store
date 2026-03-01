import { notFound } from "next/navigation"
import { zapatillasData, ropaData, accesoriosData } from "@/lib/data"
import { Product } from "@/lib/types"
import { ProductDetailClient } from "./product-detail-client"
import type { Metadata } from "next"

type Category = "zapatillas" | "ropa" | "accesorios"

function getAllProductsWithCategory(): { product: Product; category: Category }[] {
  const zapatillas = Object.values(zapatillasData)
    .flat()
    .map((p) => ({ product: p, category: "zapatillas" as Category }))
  const ropa = Object.values(ropaData)
    .flatMap((marcas) => Object.values(marcas).flat())
    .map((p) => ({ product: p, category: "ropa" as Category }))
  const accesorios = accesoriosData.map((p) => ({
    product: p,
    category: "accesorios" as Category,
  }))
  return [...zapatillas, ...ropa, ...accesorios]
}

function getProductBySlug(slug: string): { product: Product; category: Category } | undefined {
  return getAllProductsWithCategory().find(
    ({ product }) => product.slug === slug || product.id === slug
  )
}

export async function generateStaticParams() {
  return getAllProductsWithCategory().map(({ product }) => ({
    slug: product.slug ?? product.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const found = getProductBySlug(slug)
  if (!found) return {}
  const { product } = found
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
  const found = getProductBySlug(slug)
  if (!found) notFound()

  return <ProductDetailClient product={found.product} category={found.category} />
}
