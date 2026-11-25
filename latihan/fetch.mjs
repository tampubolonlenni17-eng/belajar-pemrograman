async function ambil(url) {
  const res = await fetch(url);
  console.log("Status:", res.status, res.ok);
  if (!res.ok) throw new Error(`Server menjawab ${res.status}`);
  return res.json();
}

async function main() {
  try {
    const data = await ambil("https://dummyjson.com/products?limit=5&select=title,price,stock");
    console.log("Total produk di server:", data.total);
    console.table(data.products);

    const satu = await ambil("https://dummyjson.com/products/1");
    console.log("Produk 1:", satu.title, satu.price);

    await ambil("https://dummyjson.com/products/99999");
  } catch (err) {
    console.log("Ditangkap:", err.message);
  }
}

main();