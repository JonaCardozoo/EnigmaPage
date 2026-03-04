"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidateTag } from "next/cache"
import type { Product, Inquiry } from "./types"

// Products
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all products:", error)
    return []
  }

  return data || []
}

export async function createProduct(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const category = formData.get("category") as string
  const image_url = formData.get("image_url") as string

  const { error } = await supabase.from("products").insert({
    name,
    description: description || null,
    price,
    category: category || null,
    image_url: image_url || null,
    is_active: true,
  })

  if (error) {
    console.error("Error creating product:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("products", "max")
  return { success: true }
}

export async function updateProduct(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const category = formData.get("category") as string
  const image_url = formData.get("image_url") as string
  const is_active = formData.get("is_active") === "true"

  const { error } = await supabase
    .from("products")
    .update({
      name,
      description: description || null,
      price,
      category: category || null,
      image_url: image_url || null,
      is_active,
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating product:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("products", "max")
  return { success: true }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("products", "max")
  return { success: true }
}

export async function toggleProductActive(id: string, is_active: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from("products")
    .update({ is_active })
    .eq("id", id)

  if (error) {
    console.error("Error toggling product:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("products", "max")
  return { success: true }
}

// Inquiries
export async function getInquiries(): Promise<Inquiry[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("inquiries")
    .select(`
      *,
      product:products(*)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching inquiries:", error)
    return []
  }

  return data || []
}

export async function createInquiry(
  productId: string,
  productName: string,
  customerName: string,
  customerPhone: string,
  message?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.from("inquiries").insert({
    product_id: productId,
    product_name: productName,
    customer_name: customerName,
    customer_phone: customerPhone,
    message: message || null,
  })

  if (error) {
    console.error("Error creating inquiry:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("inquiries", "max")
  return { success: true }
}

export async function markInquiryAsRead(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from("inquiries")
    .update({ is_read: true })
    .eq("id", id)

  if (error) {
    console.error("Error marking inquiry as read:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("inquiries", "max")
  return { success: true }
}

export async function deleteInquiry(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.from("inquiries").delete().eq("id", id)

  if (error) {
    console.error("Error deleting inquiry:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("inquiries", "max")
  return { success: true }
}
