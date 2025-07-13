"use client"

import { priceRanges } from "@/lib/utils"

export default function FilterBar({ onSearch, onFilter }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 mb-6">
      <input
        placeholder="Tìm theo tên..."
        className="border p-2 rounded w-full md:w-1/2"
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        className="border p-2 rounded"
        onChange={(e) => {
          const range = priceRanges.find(r => r.label === e.target.value)
          if (range) onFilter({ min: range.min, max: range.max })
        }}
      >
        <option value="">Lọc theo giá</option>
        {priceRanges.map(r => (
          <option key={r.label} value={r.label}>{r.label}</option>
        ))}
      </select>
    </div>
  )
}