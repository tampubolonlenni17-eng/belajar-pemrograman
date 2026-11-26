// lib/kueri.js — pencarian, filter, pengurutan, dan pagination sebagai satu fungsi murni.

export const PILIHAN_URUT = {
  "nama-naik": { label: "Nama A–Z", banding: (a, b) => a.nama.localeCompare(b.nama, "id") },
  "harga-naik": { label: "Harga termurah", banding: (a, b) => a.harga - b.harga },
  "harga-turun": { label: "Harga termahal", banding: (a, b) => b.harga - a.harga },
  "stok-naik": { label: "Stok paling sedikit", banding: (a, b) => a.stok - b.stok },
};

/**
 * @param {Array} daftar
 * @param {{kata?:string, kategori?:string, urut?:string, halaman?:number, perHalaman?:number}} kueri
 * @returns {{data:Array, total:number, totalHalaman:number, halaman:number}}
 */
export function terapkanKueri(
  daftar,
  { kata = "", kategori = "", urut = "nama-naik", halaman = 1, perHalaman = 5 } = {}
) {
  const k = kata.trim().toLowerCase();

  const tersaring = daftar
    .filter((b) => !k || b.nama.toLowerCase().includes(k) || b.kode.toLowerCase().includes(k))
    .filter((b) => !kategori || b.kategori === kategori);

  const terurut = [...tersaring].sort((PILIHAN_URUT[urut] ?? PILIHAN_URUT["nama-naik"]).banding);

  const total = terurut.length;
  const totalHalaman = Math.max(1, Math.ceil(total / perHalaman));
  const h = Math.min(Math.max(1, halaman), totalHalaman);
  const awal = (h - 1) * perHalaman;

  return { data: terurut.slice(awal, awal + perHalaman), total, totalHalaman, halaman: h };
}