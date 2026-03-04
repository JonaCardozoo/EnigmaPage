export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-card">
      {/* Video de fondo */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-20"
        >
          <source src="/videoplaya.mp4" type="video/mp4" />
        </video>

        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-card/70 to-card/90" />
      </div>

      {/* Gradiente decorativo */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="container relative z-20 mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge ubicación */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              Nogoya, Entre Rios
            </span>
          </div>

          {/* Título */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Detalles que <span className="block text-primary">abrazan</span> tu piel
            
          </h1>

          {/* Descripción */}
          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Que te queda lindo ser vos. Descubri nuestra coleccion de lenceria
            con estilo y comodidad.
            <span className="mt-2 block text-sm">
              Envios a Parana acordados.
            </span>
          </p>

          {/* Botones */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#productos"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
            >
              Ver Catálogo
            </a>

            <a
              href="https://wa.me/5493435095742"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background/50 px-6 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary hover:bg-background/80 hover:text-primary"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
              Contactanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
