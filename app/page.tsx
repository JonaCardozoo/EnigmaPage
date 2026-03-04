import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductsGrid } from "@/components/products-grid"
import { Footer } from "@/components/footer"
import { getProducts } from "@/lib/actions"

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />

      <main className="flex-1">
        <section id="productos" className="container mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="mb-3  text-3xl font-bold text-foreground md:text-4xl">
              Nuestra Coleccion
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Explora nuestra seleccion de lenceria. Toca en cualquier producto para consultarnos por WhatsApp.
            </p>
          </div>

          <ProductsGrid products={products} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
