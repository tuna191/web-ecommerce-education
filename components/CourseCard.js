"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CourseCard({ product, onView, onFavorite }) {
  return (
    <Card className="w-full max-w-xs shadow-md transition hover:scale-105">
      <img src={product.image} alt={product.name} className="rounded-t-xl h-48 w-full object-cover" />
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-500">{product.shortDesc}</p>
        <p className="mt-2 text-primary font-semibold">{product.price.toLocaleString()} VND</p>
        <div className="flex gap-2 mt-4">
          <Button onClick={onView}>Xem chi tiết</Button>
          <Button variant="outline" onClick={onFavorite}>❤️</Button>
        </div>
      </CardContent>
    </Card>
  )
}