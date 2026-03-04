import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const _playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });
const _montserrat = Montserrat({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'ENIGMA Lencería | Nogoyá, Entre Ríos',
  description: 'Tu tienda de lencería en Nogoyá, Entre Ríos. Envíos a Paraná acordados. Ponete lo que se te cante, que te queda lindo ser vos.',
  keywords: ['lencería', 'ropa interior', 'Nogoyá', 'Entre Ríos', 'envíos', 'moda'],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
