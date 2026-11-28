// lib/data-barang.js — data contoh. Mulai Pertemuan 14 data ini pindah ke MySQL.

/**
 * @typedef {object} Barang
 * @property {number} id Nomor unik barang
 * @property {string} kode Kode barang, pola AAA-000 (contoh ATK-001)
 * @property {string} nama Nama barang
 * @property {string} kategori Salah satu nilai KATEGORI
 * @property {number} harga Harga jual dalam rupiah (bilangan bulat > 0)
 * @property {number} stok Jumlah persediaan (bilangan bulat ≥ 0)
 * @property {string} satuan Satuan jual: pcs, botol, bungkus, ...
 */

/** Daftar kategori yang boleh dipakai. */
export const KATEGORI = ["Alat Tulis", "Makanan", "Minuman", "Kebersihan"];

// Satu barang satu baris agar mudah dibaca seperti tabel; Prettier diminta tidak merapikannya.
// prettier-ignore
export const daftarBarang = [
  { id: 1, kode: "ATK-001", nama: "Buku Tulis 58 Lembar", kategori: "Alat Tulis", harga: 5000, stok: 120, satuan: "pcs" },
  { id: 2, kode: "ATK-002", nama: "Pensil 2B", kategori: "Alat Tulis", harga: 3000, stok: 0, satuan: "pcs" },
  { id: 3, kode: "ATK-003", nama: "Spidol Hitam", kategori: "Alat Tulis", harga: 9000, stok: 15, satuan: "pcs" },
  { id: 4, kode: "MKN-001", nama: "Mi Instan Goreng", kategori: "Makanan", harga: 3500, stok: 200, satuan: "bungkus" },
  { id: 5, kode: "MKN-002", nama: "Roti Cokelat", kategori: "Makanan", harga: 8000, stok: 0, satuan: "pcs" },
  { id: 6, kode: "MKN-003", nama: "Biskuit Kelapa", kategori: "Makanan", harga: 7500, stok: 8, satuan: "bungkus" },
  { id: 7, kode: "MNM-001", nama: "Air Mineral 600 ml", kategori: "Minuman", harga: 4000, stok: 48, satuan: "botol" },
  { id: 8, kode: "MNM-002", nama: "Teh Botol", kategori: "Minuman", harga: 6000, stok: 5, satuan: "botol" },
  { id: 9, kode: "MNM-003", nama: "Kopi Sachet", kategori: "Minuman", harga: 2000, stok: 90, satuan: "sachet" },
  { id: 10, kode: "KBR-001", nama: "Sabun Mandi", kategori: "Kebersihan", harga: 4500, stok: 36, satuan: "pcs" },
  { id: 11, kode: "KBR-002", nama: "Pasta Gigi", kategori: "Kebersihan", harga: 12000, stok: 3, satuan: "tube" },
  { id: 12, kode: "KBR-003", nama: "Sabun Cuci Piring", kategori: "Kebersihan", harga: 15000, stok: 22, satuan: "botol" },
];

export const BATAS_MENIPIS = 10;
