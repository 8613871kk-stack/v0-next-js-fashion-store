"use client"

import { perfumesData } from "@/lib/data"
import { SimpleProductPage } from "@/components/simple-product-page"

export default function PerfumesPage() {
  return (
    <SimpleProductPage
      title="Perfumes"
      description="Fragancias inspiradas en los perfumes mas exclusivos del mundo"
      products={perfumesData}
    />
  )
}
