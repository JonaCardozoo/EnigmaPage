"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/types";
import { createInquiry } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function WhatsAppModal({
  isOpen,
  onClose,
  product,
}: WhatsAppModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Por favor completa tu nombre y telefono",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      // Save inquiry to database
      await createInquiry(product.id, product.name, name, phone, message);

      // Build WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `Hola! Me interesa el producto: *${product.name}* ($${product.price.toLocaleString("es-AR")})\n\n` +
          `Mi nombre es: ${name}\n` +
          `Mi telefono: ${phone}\n` +
          (message ? `\nMensaje adicional: ${message}` : "") +
          `\n\nQuisiera mas informacion!`,
      );

      // Open WhatsApp
      window.open(
        `https://wa.me/5493435095739?text=${whatsappMessage}`,
        "_blank",
      );

      toast({ title: "Redirigiendo a WhatsApp..." });

      // Reset and close
      setName("");
      setPhone("");
      setMessage("");
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className=" text-xl">
            Consultar producto
          </DialogTitle>
          <DialogDescription>
            Completa tus datos para contactarnos por WhatsApp
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary/50 p-3">
          {product.image_url ? (
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              width={60}
              height={60}
              className="h-15 w-15 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-15 w-15 items-center justify-center rounded-lg bg-muted">
              <svg
                className="h-6 w-6 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <div>
            <p className="font-medium text-foreground">{product.name}</p>
            <p className="text-lg font-bold text-primary">
              ${product.price.toLocaleString("es-AR")}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tu nombre *</Label>
            <Input
              id="name"
              placeholder="Ej: Maria Garcia"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Tu telefono *</Label>
            <Input
              id="phone"
              placeholder="Ej: 3435123456"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje adicional (opcional)</Label>
            <Textarea
              id="message"
              placeholder="Ej: Quiero consultar por talles disponibles..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {isPending ? "Enviando..." : "Enviar por WhatsApp"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
