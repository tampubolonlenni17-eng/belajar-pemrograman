const tunda = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function cekStok(nama, stok) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stok > 0) resolve(`${nama}: stok ${stok}`);
      else reject(new Error(`${nama} habis`));
    }, 300);
  });
}

console.log("1. Mulai");
setTimeout(() => console.log("2. Timer 0 ms"), 0);
Promise.resolve().then(() => console.log("3. Promise selesai"));
console.log("4. Baris terakhir kode biasa");

async function proses() {
  await tunda(500);
  console.log("5. Setelah tunda 500 ms");
  try {
    console.log("6.", await cekStok("Buku", 12));
    console.log("7.", await cekStok("Pensil", 0));
    console.log("baris ini tidak pernah dijalankan");
  } catch (err) {
    console.log("8. Gagal:", err.message);
  } finally {
    console.log("9. finally selalu jalan");
  }
  console.time("berurutan");
  const teh = await cekStok("Teh", 5);
  const kopi = await cekStok("Kopi", 9);
  console.timeEnd("berurutan");
  console.log("10.", [teh, kopi]);
}

proses();