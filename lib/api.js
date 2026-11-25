const BASE = "https://dummyjson.com/products";
const KOLOM = "title,price,stock,category,thumbnail,description";

export const tunda = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function ambilProduk(kata = "") {
  const url = kata
    ? `${BASE}/search?q=${encodeURIComponent(kata)}&limit=12&select=${KOLOM}`
    : `${BASE}?limit=12&select=${KOLOM}`;

  try {
    await tunda(800); // hanya untuk memperlihatkan loading.js
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Server menjawab ${res.status}`);
    const json = await res.json();
    return { data: json.products, total: json.total, error: null };
  } catch (err) {
    return { data: [], total: 0, error: err.message };
  }
}