"use client"

import { useState } from "react"
import { Product } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { CheckoutForm } from "@/components/checkout-form"

interface SimpleProductPageProps {
  title: string
  description: string
  products: Product[]
}

export function SimpleProductPage({
  title,
  description,
  products,
}: SimpleProductPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOrder={setSelectedProduct}
          />
        ))}
      </div>

      <CheckoutForm
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}
