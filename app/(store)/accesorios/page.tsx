"use client"

import { useState, useMemo } from "react"
import { accesoriosData } from "@/lib/data"
import { slugify } from "@/lib/utils"
import { Product } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { CheckoutForm } from "@/components/checkout-form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccesoriosPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Group flat list by brand
  const grouped = useMemo(() => {
    const map: Record<string, Product[]> = {}
    for (const product of accesoriosData) {
      const brand = product.brand ?? "Otros"
      if (!map[brand]) map[brand] = []
      map[brand].push(product)
    }
    return map
  }, [])

  const brands = Object.keys(grouped)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Accesorios
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gorras, bolsos, cinturones y mas para completar tu look
        </p>
      </div>

      <Accordion type="multiple" defaultValue={brands} className="flex flex-col gap-4">
        {brands.map((brand) => (
          <div key={brand} id={slugify(brand)}>
            <AccordionItem
              value={brand}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-foreground hover:no-underline">
                {brand}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({grouped[brand].length} productos)
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[brand].map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOrder={setSelectedProduct}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>

      <CheckoutForm
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}
