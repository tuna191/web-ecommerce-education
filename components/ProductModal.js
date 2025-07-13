"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ProductModal({ product, open, onClose }) {
  if (!product) return null
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
        <p className="mt-4">{product.longDesc}</p>
        <p className="mt-2 font-semibold text-primary">{product.price.toLocaleString()} VND</p>
      </DialogContent>
    </Dialog>
  )
}