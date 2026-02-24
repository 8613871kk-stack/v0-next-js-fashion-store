"use client"

import { useState } from "react"
import { X, CheckCircle2, Loader2 } from "lucide-react"
import { Product } from "@/lib/types"
import { PROVINCIAS_ESPANA } from "@/lib/data"
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

interface CheckoutFormProps {
  product: Product | null
  onClose: () => void
}

export function CheckoutForm({ product, onClose }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    provincia: "",
    ciudad: "",
    codigoPostal: "",
    talla: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!product) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://formspree.io/f/xzzbqwpa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          producto: product.name,
          precio: product.price + "€",
          precioOriginal: product.originalPrice + "€",
          metodo: "Contra Reembolso",
        }),
      })

      if (response.ok) {
        setSuccess(true)
      }
    } catch {
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-lg bg-card p-8 text-center shadow-xl">
          <CheckCircle2 className="mx-auto h-16 w-16 text-whatsapp" />
          <h3 className="mt-4 text-xl font-bold text-foreground">
            Pedido Enviado
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Tu pedido de <strong>{product.name}</strong> por{" "}
            <strong>{product.price}€</strong> ha sido registrado. Te
            contactaremos pronto para confirmar.
          </p>
          <Button onClick={onClose} className="mt-6 w-full">
            Cerrar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-card shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Completar Pedido
            </h3>
            <p className="text-sm text-muted-foreground">
              {product.name} -{" "}
              <span className="font-semibold text-foreground">
                {product.price}€
              </span>{" "}
              <span className="text-xs line-through">
                {product.originalPrice}€
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Cerrar formulario"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                required
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                required
                placeholder="Tu apellido"
                value={formData.apellido}
                onChange={(e) => handleChange("apellido", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="telefono">Telefono</Label>
            <Input
              id="telefono"
              type="tel"
              required
              placeholder="+34 600 000 000"
              value={formData.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="direccion">Direccion</Label>
            <Input
              id="direccion"
              required
              placeholder="Calle, numero, piso..."
              value={formData.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="provincia">Provincia</Label>
            <Select
              value={formData.provincia}
              onValueChange={(val) => handleChange("provincia", val)}
              required
            >
              <SelectTrigger id="provincia">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                required
                placeholder="Tu ciudad"
                value={formData.ciudad}
                onChange={(e) => handleChange("ciudad", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="codigoPostal">Codigo Postal</Label>
              <Input
                id="codigoPostal"
                required
                placeholder="28001"
                value={formData.codigoPostal}
                onChange={(e) => handleChange("codigoPostal", e.target.value)}
              />
            </div>
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="talla">Talla</Label>
              <Select
                value={formData.talla}
                onValueChange={(val) => handleChange("talla", val)}
                required
              >
                <SelectTrigger id="talla">
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
            </div>
          )}

          <div className="mt-2 rounded-md bg-secondary p-3">
            <p className="text-center text-sm font-medium text-secondary-foreground">
              Pago Contra Reembolso - Pagas al recibir
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full py-6 text-base">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>Completar Pedido - Contra Reembolso</>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
