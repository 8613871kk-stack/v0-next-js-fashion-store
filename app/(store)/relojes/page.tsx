"use client"

import { relojesData } from "@/lib/data"
import { SimpleProductPage } from "@/components/simple-product-page"

export default function RelojesPage() {
  return (
    <SimpleProductPage
      title="Relojes"
      description="Relojes de lujo inspirados en las marcas mas prestigiosas"
      products={relojesData}
    />
  )
}
