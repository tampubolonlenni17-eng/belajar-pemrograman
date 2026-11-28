// lib/kueri.js — pencarian, filter, pengurutan, dan pagination sebagai satu fungsi murni.

/* Fungsi banding untuk Array.sort: negatif = a dulu, positif = b dulu. */
const banding = {
  nama: (a, b) => a.nama.localeCompare(b.nama, "id"),
  hargaNaik: (a, b) => a.harga - b.harga,
  hargaTurun: (a, b) => b.harga - a.harga,
  stokNaik: (a, b) => a.stok - b.stok,
};

/** Pilihan urutan untuk menu: kunci → label dan fungsi banding. */
export const PILIHAN_URUT = {
  "nama-naik": { label: "Nama A–Z", banding: banding.nama },
  "harga-naik": { label: "Harga termurah", banding: banding.hargaNaik },
  "harga-turun": { label: "Harga termahal", banding: banding.hargaTurun },
  "stok-naik": { label: "Stok paling sedikit", banding: banding.stokNaik },
};

/**
 * Terapkan pencarian, filter kategori, pengurutan, dan pagination sekaligus.
 * Halaman di luar batas dikoreksi ke 1..totalHalaman.
 * @param {import("./data-barang.js").Barang[]} daftar Daftar lengkap (tidak diubah)
 * @param {{kata?:string, kategori?:string, urut?:string, halaman?:number, perHalaman?:number}} [kueri] Pilihan pengguna
 * @returns {{data:import("./data-barang.js").Barang[], total:number, totalHalaman:number, halaman:number}} Potongan halaman dan info pagination
 * @example terapkanKueri(daftar, { kata: "sabun", halaman: 1 });
 */
export function terapkanKueri(
  daftar,
  { kata = "", kategori = "", urut = "nama-naik", halaman = 1, perHalaman = 5 } = {},
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
