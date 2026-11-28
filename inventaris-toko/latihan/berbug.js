// latihan/berbug.js — versi SESUDAH diperbaiki. Komentar "PERBAIKAN" menjelaskan bug aslinya.

/** Jumlah harga × jumlah semua item. Keranjang kosong → 0. */
export function hitungSubtotal(item) {
  // PERBAIKAN 1: reduce tanpa nilai awal memakai item pertama (objek) sebagai t
  return item.reduce((t, i) => t + i.harga * i.jumlah, 0);
}

/** Diskon 5% mulai Rp 50.000, 10% mulai Rp 100.000. */
export function persenDiskonSederhana(subtotal) {
  // PERBAIKAN 2: "mulai" berarti termasuk nilai batas → >= bukan >
  if (subtotal >= 100000) return 10;
  if (subtotal >= 50000) return 5;
  return 0;
}

/** Rata-rata harga. Daftar kosong → 0. */
export function rataRataHarga(daftar) {
  // PERBAIKAN 3: 0 / 0 = NaN
  if (daftar.length === 0) return 0;
  const total = daftar.reduce((t, b) => t + b.harga, 0);
  return total / daftar.length;
}

/** Cari barang berdasarkan nama, tidak peka huruf besar/kecil. */
export function cariNama(daftar, kata) {
  // PERBAIKAN 4: samakan huruf kecil di kedua sisi
  const k = kata.toLowerCase();
  return daftar.filter((b) => b.nama.toLowerCase().includes(k));
}

/** Jumlah halaman untuk `total` data dengan `perHalaman` data per halaman (minimal 1). */
export function jumlahHalaman(total, perHalaman) {
  // PERBAIKAN 5: sisa data tetap butuh satu halaman → ceil, bukan floor
  return Math.max(1, Math.ceil(total / perHalaman));
}
