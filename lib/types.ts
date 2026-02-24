export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  sizes?: string[]
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
  producto: string
  precio: number
}
