"use client"

import { useState, useEffect } from "react"
import { products as mockProducts } from "@/lib/data"
import CourseCard from "@/components/CourseCard"
import FilterBar from "@/components/FilterBar"
import ProductModal from "@/components/ProductModal"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"

export default function HomePage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRange, setFilterRange] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [history, setHistory] = useState([])
  const [suggesting, setSuggesting] = useState(false)

  useEffect(() => {
    let filtered = mockProducts
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (filterRange) {
      filtered = filtered.filter(p => p.price >= filterRange.min && p.price <= filterRange.max)
    }
    setProducts(filtered)
  }, [searchQuery, filterRange])

  const handleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
    toast({ title: "Cập nhật yêu thích thành công!" })
  }

  const handleView = (id) => {
    setSelectedProduct(mockProducts.find(p => p.id === id) || null)
    setHistory(prev => [...new Set([id, ...prev])])
  }

  const getSuggestions = async () => {
    setSuggesting(true)
    try {
      const res = await axios.get("/api/suggestions")
      setProducts(res.data)
    } catch {
      toast({ title: "Không thể lấy gợi ý lúc này", variant: "destructive" })
    } finally {
      setSuggesting(false)
    }
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Sàn giáo dục thương mại điện tử</h1>
      <FilterBar onSearch={setSearchQuery} onFilter={setFilterRange} />
      <Button onClick={getSuggestions}>
        {suggesting ? "Đang gợi ý..." : "Gợi ý sản phẩm phù hợp"}
      </Button>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {products.map(product => (
          <CourseCard
            key={product.id}
            product={product}
            onView={() => handleView(product.id)}
            onFavorite={() => handleFavorite(product.id)}
          />
        ))}
      </div>
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-2">Lịch sử xem</h2>
        <div className="flex gap-2 overflow-x-auto">
          {history.map(id => {
            const p = mockProducts.find(p => p.id === id)
            return p ? (
              <img key={id} src={p.image} alt={p.name} className="w-24 h-16 object-cover rounded" />
            ) : null
          })}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Danh sách yêu thích</h2>
        <div className="flex gap-2 overflow-x-auto">
          {favorites.map(id => {
            const p = mockProducts.find(p => p.id === id)
            return p ? (
              <img key={id} src={p.image} alt={p.name} className="w-24 h-16 object-cover rounded" />
            ) : null
          })}
        </div>
      </div>
    </main>
  )
}