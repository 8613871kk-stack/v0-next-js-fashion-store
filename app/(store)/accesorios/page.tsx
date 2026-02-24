"use client"

import { accesoriosData } from "@/lib/data"
import { SimpleProductPage } from "@/components/simple-product-page"

export default function AccesoriosPage() {
  return (
    <SimpleProductPage
      title="Accesorios"
      description="Gorras, bolsos, cinturones y mas para completar tu look"
      products={accesoriosData}
    />
  )
}
