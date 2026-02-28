"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: Product
  onOrder: (product: Product) => void
}

export function ProductCard({ product, onOrder }: ProductCardProps) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )
  const detailHref = product.slug ? `/producto/${product.slug}` : null

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {detailHref && (
          <Link href={detailHref} className="absolute inset-0 z-10" aria-label={`Ver ${product.name}`} />
        )}
        <Badge className="absolute left-3 top-3 z-20 bg-sale text-sale-foreground hover:bg-sale">
          {"AHORRA " + discount + "%"}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {detailHref ? (
          <Link href={detailHref}>
            <h3 className="text-base font-semibold text-foreground hover:underline">
              {product.name}
            </h3>
          </Link>
        ) : (
          <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
        )}
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {product.description}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">{product.price}€</span>
          <span className="text-sm text-muted-foreground line-through">
            {product.originalPrice}€
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <Button
            onClick={() => onOrder(product)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Pedir Ahora
          </Button>
          {detailHref && (
            <Link href={detailHref}>
              <Button variant="outline" className="w-full">
                Ver Detalles
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
