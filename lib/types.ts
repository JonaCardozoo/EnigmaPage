export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: string | null
  image_url: string | null
  is_active: boolean
  created_at: string
}

export interface Inquiry {
  id: string
  product_id: string
  product_name: string
  customer_name: string
  customer_phone: string
  message: string | null
  created_at: string
  is_read: boolean
  product?: Product
}
