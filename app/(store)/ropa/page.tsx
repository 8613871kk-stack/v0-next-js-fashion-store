"use client"

import { useState } from "react"
import { ropaData } from "@/lib/data"
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

export default function RopaPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const tiposRopa = Object.keys(ropaData)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Ropa
        </h1>
        <p className="mt-2 text-muted-foreground">
          Chandals, chaquetas, camisetas y pantalones de las mejores marcas
        </p>
      </div>

      <Accordion type="multiple" defaultValue={tiposRopa} className="flex flex-col gap-4">
        {tiposRopa.map((tipo) => {
          const marcas = Object.keys(ropaData[tipo])
          const totalProducts = marcas.reduce(
            (sum, m) => sum + ropaData[tipo][m].length,
            0
          )
          const tipoSlug = slugify(tipo)

          return (
            // id on outer div so the tipo-level anchor resolves (e.g. #chandal)
            <div key={tipo} id={tipoSlug}>
              <AccordionItem
                value={tipo}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-foreground hover:no-underline">
                  {tipo}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({totalProducts} productos)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <Accordion type="multiple" defaultValue={marcas} className="flex flex-col gap-3">
                    {marcas.map((marca) => {
                      // composite id: chandal-nike, chandal-lacoste, etc.
                      const marcaSlug = `${tipoSlug}-${slugify(marca)}`

                      return (
                        <div key={marca} id={marcaSlug}>
                          <AccordionItem
                            value={marca}
                            className="overflow-hidden rounded-md border border-border bg-secondary/50"
                          >
                            <AccordionTrigger className="px-4 py-3 text-base font-medium text-foreground hover:no-underline">
                              {marca}
                              <span className="ml-2 text-sm font-normal text-muted-foreground">
                                ({ropaData[tipo][marca].length})
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {ropaData[tipo][marca].map((product) => (
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
                      )
                    })}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </div>
          )
        })}
      </Accordion>

      <CheckoutForm
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}
