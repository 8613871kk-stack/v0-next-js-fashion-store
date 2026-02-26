export interface Product {
  id: string
  slug?: string
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  images?: string[]
  sizes?: string[]
  colors?: string[]
  brand?: string
}

export interface OrderFormData {
  nombre: string
  apellido: string
  telefono: string
  direccion: string
  provincia: string
  ciudad: string
  codigoPostal: string
  talla?: string
  color?: string
  cantidad?: string
  producto: string
  precio: number
}
