"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Inquiry } from "@/lib/types"
import { markInquiryAsRead, deleteInquiry } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"

interface InquiriesManagerProps {
  inquiries: Inquiry[]
}

export function InquiriesManager({ inquiries }: InquiriesManagerProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleMarkAsRead = (id: string) => {
    startTransition(async () => {
      const result = await markInquiryAsRead(id)
      if (result.success) {
        toast({ title: "Marcado como leido" })
        router.refresh()
      } else {
        toast({ title: "Error", description: result.error || "Error al actualizar", variant: "destructive" })
      }
    })
  }

  const handleDelete = (inquiry: Inquiry) => {
    if (!confirm(`Seguro que queres eliminar esta consulta de ${inquiry.customer_name}?`)) return

    startTransition(async () => {
      const result = await deleteInquiry(inquiry.id)
      if (result.success) {
        toast({ title: "Consulta eliminada" })
        router.refresh()
      } else {
        toast({ title: "Error", description: result.error || "Error al eliminar", variant: "destructive" })
      }
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (inquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="mb-2 font-medium text-foreground">No hay consultas</h3>
        <p className="text-sm text-muted-foreground">
          Las consultas de WhatsApp apareceran aqui
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold text-foreground">
        {inquiries.length} {inquiries.length === 1 ? "consulta" : "consultas"}
      </h2>

      <div className="space-y-3">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`rounded-xl border bg-card p-4 transition-all ${
              inquiry.is_read ? "border-border" : "border-primary/50 bg-primary/5"
            }`}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{inquiry.customer_name}</h3>
                  {!inquiry.is_read && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      Nueva
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{inquiry.customer_phone}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(inquiry.created_at)}
              </span>
            </div>

            <div className="mb-3 rounded-lg bg-secondary/50 p-3">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Producto consultado:</p>
              <p className="font-medium text-foreground">{inquiry.product_name}</p>
            </div>

            {inquiry.message && (
              <div className="mb-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">Mensaje:</p>
                <p className="text-sm text-foreground">{inquiry.message}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${inquiry.customer_phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center gap-2 rounded-lg bg-[#25D366] px-4 text-sm font-medium text-white transition-colors hover:bg-[#25D366]/90"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Responder
              </a>
              {!inquiry.is_read && (
                <button
                  onClick={() => handleMarkAsRead(inquiry.id)}
                  disabled={isPending}
                  className="flex h-9 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Marcar leido
                </button>
              )}
              <button
                onClick={() => handleDelete(inquiry)}
                disabled={isPending}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                title="Eliminar"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
