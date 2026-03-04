"use client"

import React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createProduct, updateProduct } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"

interface ProductFormProps {
  product?: Product | null
  onClose: () => void
}

export function ProductForm({ product, onClose }: ProductFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [imagePreview, setImagePreview] = useState(product?.image_url || "")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      let result
      if (product) {
        result = await updateProduct(product.id, formData)
      } else {
        result = await createProduct(formData)
      }

      if (result.success) {
        toast({ title: product ? "Producto actualizado" : "Producto creado" })
        router.refresh()
        onClose()
      } else {
        toast({ title: "Error", description: result.error || "Error al guardar", variant: "destructive" })
      }
    })
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-foreground">
          {product ? "Editar Producto" : "Nuevo Producto"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-medium text-foreground">Informacion basica</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del producto *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej: Conjunto de encaje"
                defaultValue={product?.name || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripcion</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe el producto..."
                defaultValue={product?.description || ""}
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue={product?.price || ""}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Ej: Conjuntos, Pijamas..."
                  defaultValue={product?.category || ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-medium text-foreground">Imagen</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image_url">URL de la imagen</Label>
              <Input
                id="image_url"
                name="image_url"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                defaultValue={product?.image_url || ""}
                onChange={(e) => setImagePreview(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Podes usar links de Instagram, Google Drive (publico), o cualquier URL de imagen
              </p>
            </div>

            {imagePreview && (
              <div className="overflow-hidden rounded-lg border border-border">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Vista previa"
                  className="h-48 w-full object-cover"
                  onError={() => setImagePreview("")}
                />
              </div>
            )}
          </div>
        </div>

        {product && (
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-medium text-foreground">Estado</h3>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                value="true"
                defaultChecked={product.is_active}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                Producto activo (visible en la tienda)
              </Label>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? "Guardando..." : product ? "Guardar cambios" : "Crear producto"}
          </Button>
        </div>
      </form>
    </div>
  )
}
