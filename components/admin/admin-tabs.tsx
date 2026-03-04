"use client"

import { useState } from "react"
import type { Product, Inquiry } from "@/lib/types"
import { ProductsManager } from "./products-manager"
import { InquiriesManager } from "./inquiries-manager"

interface AdminTabsProps {
  products: Product[]
  inquiries: Inquiry[]
}

export function AdminTabs({ products, inquiries }: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<"products" | "inquiries">("products")
  const unreadCount = inquiries.filter((i) => !i.is_read).length

  return (
    <div>
      <div className="mb-6 flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("products")}
          className={`relative px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "products"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Productos
          {activeTab === "products" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "inquiries"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Consultas
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
              {unreadCount}
            </span>
          )}
          {activeTab === "inquiries" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {activeTab === "products" ? (
        <ProductsManager products={products} />
      ) : (
        <InquiriesManager inquiries={inquiries} />
      )}
    </div>
  )
}
