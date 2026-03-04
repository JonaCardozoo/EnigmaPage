import Link from "next/link"
import { getAllProducts, getInquiries } from "@/lib/actions"
import { AdminTabs } from "@/components/admin/admin-tabs"
import { AdminWrapper } from "@/components/admin/admin-wrapper"

export default async function AdminPage() {
  const [products, inquiries] = await Promise.all([
    getAllProducts(),
    getInquiries(),
  ])

  const unreadCount = inquiries.filter((i) => !i.is_read).length

  return (
    <AdminWrapper>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/30">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-primary"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 3c-1.5 0-2.5 1-3 2s-1.5 2-3 2c-2 0-3 1.5-3 3 0 2 1 3 2 4s2 3 2 5c0 1 .5 2 2 2h6c1.5 0 2-1 2-2 0-2 1-4 2-5s2-2 2-4c0-1.5-1-3-3-3-1.5 0-2.5-1-3-2s-1.5-2-3-2z" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className=" text-xl font-bold tracking-wide text-foreground">ENIGMA</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary">admin</span>
                </div>
              </Link>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a la tienda
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 font-serif text-3xl font-bold text-foreground">Panel de Administracion</h1>
            <p className="text-muted-foreground">Gestiona tus productos y consultas de clientes</p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-2 text-sm font-medium text-muted-foreground">Total Productos</div>
              <div className="text-3xl font-bold text-foreground">{products.length}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-2 text-sm font-medium text-muted-foreground">Productos Activos</div>
              <div className="text-3xl font-bold text-primary">{products.filter((p) => p.is_active).length}</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-2 text-sm font-medium text-muted-foreground">Consultas sin leer</div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-foreground">{unreadCount}</span>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                    Nuevas
                  </span>
                )}
              </div>
            </div>
          </div>

          <AdminTabs products={products} inquiries={inquiries} />
        </main>
      </div>
    </AdminWrapper>
  )
}
