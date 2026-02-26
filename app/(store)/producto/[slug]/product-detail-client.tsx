"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  X,
  MessageCircle,
} from "lucide-react"
import { Product } from "@/lib/types"
import { PROVINCIAS_ESPANA } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const WHATSAPP_NUMBER = "34600000000"

const PLACEHOLDER_REVIEWS = [
  {
    id: 1,
    name: "Carlos M.",
    rating: 5,
    comment: "Excelente calidad, llegaron en 2 días tal como prometido. Muy satisfecho con la compra.",
    date: "15 Feb 2026",
  },
  {
    id: 2,
    name: "Laura G.",
    rating: 5,
    comment: "Increíbles, parecen exactamente como en las fotos. El pago contra reembolso fue muy cómodo.",
    date: "10 Feb 2026",
  },
  {
    id: 3,
    name: "Sergio R.",
    rating: 4,
    comment: "Muy buena calidad por el precio. Envío rápido y embalaje perfecto. Repetiré sin duda.",
    date: "3 Feb 2026",
  },
  {
    id: 4,
    name: "Ana P.",
    rating: 5,
    comment: "Calidad premium, incluye la caja original tal como describen. 100% recomendable.",
    date: "28 Ene 2026",
  },
  {
    id: 5,
    name: "Miguel T.",
    rating: 5,
    comment: "Producto tal y como se describe. Llegó perfectamente embalado y muy rápido.",
    date: "20 Ene 2026",
  },
]

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de ${max} estrellas`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

interface OrderModalProps {
  product: Product
  selectedSize: string
  selectedColor: string
  onClose: () => void
}

function OrderModal({ product, selectedSize, selectedColor, onClose }: OrderModalProps) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    provincia: "",
    ciudad: "",
    codigoPostal: "",
    talla: selectedSize,
    color: selectedColor || (product.colors?.[0] ?? ""),
    cantidad: "1",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validate = () => {
    const required = [
      "nombre",
      "apellido",
      "telefono",
      "direccion",
      "provincia",
      "ciudad",
      "codigoPostal",
    ]
    const newErrors: Record<string, string> = {}
    required.forEach((field) => {
      if (!form[field as keyof typeof form]?.trim()) {
        newErrors[field] = "Campo requerido"
      }
    })
    if (product.sizes && product.sizes.length > 0 && !form.talla) {
      newErrors.talla = "Selecciona una talla"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const msg = encodeURIComponent(
      `Hola, quiero hacer un pedido:\n\n` +
        `*Producto:* ${product.name}\n` +
        `*Color:* ${form.color}\n` +
        `*Talla:* ${form.talla}\n` +
        `*Cantidad:* ${form.cantidad}\n` +
        `*Precio:* ${product.price}€\n\n` +
        `*Nombre:* ${form.nombre} ${form.apellido}\n` +
        `*Teléfono:* ${form.telefono}\n` +
        `*Dirección:* ${form.direccion}\n` +
        `*Ciudad:* ${form.ciudad}, ${form.provincia} ${form.codigoPostal}\n\n` +
        `Pago contra reembolso. Gracias!`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-card shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">Pagar Contra Reembolso</h3>
            <p className="text-sm text-muted-foreground">
              {product.name} —{" "}
              <span className="font-semibold text-foreground">{product.price}€</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className={errors.nombre ? "border-destructive" : ""}
              />
              {errors.nombre && (
                <p className="text-xs text-destructive">{errors.nombre}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input
                id="apellido"
                placeholder="Tu apellido"
                value={form.apellido}
                onChange={(e) => handleChange("apellido", e.target.value)}
                className={errors.apellido ? "border-destructive" : ""}
              />
              {errors.apellido && (
                <p className="text-xs text-destructive">{errors.apellido}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="telefono">Teléfono *</Label>
            <Input
              id="telefono"
              type="tel"
              placeholder="+34 600 000 000"
              value={form.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
              className={errors.telefono ? "border-destructive" : ""}
            />
            {errors.telefono && (
              <p className="text-xs text-destructive">{errors.telefono}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="direccion">Dirección *</Label>
            <Input
              id="direccion"
              placeholder="Calle, número, piso..."
              value={form.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
              className={errors.direccion ? "border-destructive" : ""}
            />
            {errors.direccion && (
              <p className="text-xs text-destructive">{errors.direccion}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="provincia">Provincia *</Label>
            <Select
              value={form.provincia}
              onValueChange={(val) => handleChange("provincia", val)}
            >
              <SelectTrigger id="provincia" className={errors.provincia ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecciona provincia" />
              </SelectTrigger>
              <SelectContent>
                {PROVINCIAS_ESPANA.map((prov) => (
                  <SelectItem key={prov} value={prov}>
                    {prov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.provincia && (
              <p className="text-xs text-destructive">{errors.provincia}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ciudad">Ciudad *</Label>
              <Input
                id="ciudad"
                placeholder="Tu ciudad"
                value={form.ciudad}
                onChange={(e) => handleChange("ciudad", e.target.value)}
                className={errors.ciudad ? "border-destructive" : ""}
              />
              {errors.ciudad && (
                <p className="text-xs text-destructive">{errors.ciudad}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="codigoPostal">Código Postal *</Label>
              <Input
                id="codigoPostal"
                placeholder="28001"
                value={form.codigoPostal}
                onChange={(e) => handleChange("codigoPostal", e.target.value)}
                className={errors.codigoPostal ? "border-destructive" : ""}
              />
              {errors.codigoPostal && (
                <p className="text-xs text-destructive">{errors.codigoPostal}</p>
              )}
            </div>
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="talla">Talla *</Label>
              <Select
                value={form.talla}
                onValueChange={(val) => handleChange("talla", val)}
              >
                <SelectTrigger id="talla" className={errors.talla ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecciona talla" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.talla && (
                <p className="text-xs text-destructive">{errors.talla}</p>
              )}
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="color">Color</Label>
              <Select
                value={form.color}
                onValueChange={(val) => handleChange("color", val)}
              >
                <SelectTrigger id="color">
                  <SelectValue placeholder="Selecciona color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cantidad">Cantidad</Label>
            <Select
              value={form.cantidad}
              onValueChange={(val) => handleChange("cantidad", val)}
            >
              <SelectTrigger id="cantidad">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["1", "2", "3", "4", "5"].map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md bg-secondary p-3 text-center text-sm text-secondary-foreground">
            Pagas al recibir en casa — sin riesgo
          </div>

          <Button type="submit" className="w-full gap-2 py-6 text-base">
            <MessageCircle className="h-5 w-5" />
            Confirmar por WhatsApp
          </Button>
        </form>
      </div>
    </div>
  )
}

export function ProductDetailClient({ product }: { product: Product }) {
  const images = product.images && product.images.length > 0 ? product.images : [product.image]
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? "")
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? "")
  const [showOrder, setShowOrder] = useState(false)

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  const prevImage = () => setActiveImage((i) => (i - 1 + images.length) % images.length)
  const nextImage = () => setActiveImage((i) => (i + 1) % images.length)

  const avgRating = Math.round(
    PLACEHOLDER_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / PLACEHOLDER_REVIEWS.length
  )

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Inicio</Link>
          <span>/</span>
          <Link href="/zapatillas" className="hover:text-foreground">Zapatillas</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
              <Image
                src={images[activeImage]}
                alt={`${product.name} - imagen ${activeImage + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <Badge className="absolute left-3 top-3 bg-sale text-sale-foreground text-sm">
                SAVE {discount}%
              </Badge>
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Imagen anterior"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 shadow backdrop-blur-sm transition-colors hover:bg-card"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Imagen siguiente"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 shadow backdrop-blur-sm transition-colors hover:bg-card"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      i === activeImage
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Miniatura ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              {product.brand && (
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  {product.brand}
                </p>
              )}
              <h1 className="mt-1 font-serif text-3xl font-bold text-foreground text-balance">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <StarRating rating={avgRating} />
                <span className="text-sm text-muted-foreground">
                  ({PLACEHOLDER_REVIEWS.length} opiniones)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-foreground">{product.price}€</span>
              <div className="flex flex-col items-start">
                <span className="text-base text-muted-foreground line-through">
                  {product.originalPrice}€
                </span>
                <Badge className="bg-sale text-sale-foreground">SAVE {discount}%</Badge>
              </div>
            </div>

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-foreground">
                  Color: <span className="text-muted-foreground">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-md border px-4 py-1.5 text-sm transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-foreground">
                  Talla: <span className="text-muted-foreground">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 w-12 rounded-md border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Button
              size="lg"
              className="gap-2 py-7 text-base"
              onClick={() => setShowOrder(true)}
            >
              <MessageCircle className="h-5 w-5" />
              Pagar Contra Reembolso
            </Button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Envío gratis 2-3 días</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Pago al recibir</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Incluye caja original</span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-base font-semibold text-foreground">Descripción del producto</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {product.description.split(". ").filter(Boolean).map((sentence, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {sentence.trim().replace(/\.$/, "")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Opiniones de clientes
            </h2>
            <div className="flex items-center gap-2">
              <StarRating rating={avgRating} />
              <span className="text-sm font-medium text-foreground">{avgRating}.0 / 5</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{review.name}</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showOrder && (
        <OrderModal
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onClose={() => setShowOrder(false)}
        />
      )}
    </>
  )
}
