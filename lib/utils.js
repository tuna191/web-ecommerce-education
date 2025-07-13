export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ")
}

export const priceRanges = [
  { label: "<500K", min: 0, max: 500000 },
  { label: "500K–1 triệu", min: 500000, max: 1000000 },
  { label: ">1 triệu", min: 1000000, max: Infinity }
]