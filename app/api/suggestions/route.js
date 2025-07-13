import { products } from "@/lib/data"

export async function GET(req) {
  await new Promise(res => setTimeout(res, 1000))
  if (Math.random() < 0.2) {
    return new Response(JSON.stringify({ error: "Lỗi AI" }), { status: 500 })
  }
  return new Response(JSON.stringify(products.slice(0, 2)))
}