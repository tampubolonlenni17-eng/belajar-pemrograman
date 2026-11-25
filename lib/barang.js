// Fungsi murni untuk data barang
import { BATAS_MENIPIS } from "./data-barang.js";

/** "habis" | "menipis" | "tersedia" */
export function statusStok(stok, batas = BATAS_MENIPIS) {
  if (stok === 0) return "habis";
  if (stok < batas) return "menipis";
  return "tersedia";
}

/** Mengelompokkan barang per kategori */
export const kelompokkanPerKategori = (daftar) =>
  daftar.reduce((hasil, b) => {
    hasil[b.kategori] = [...(hasil[b.kategori] ?? []), b];
    return hasil;
  }, {});

/** Ringkasan untuk kartu statistik */
export function ringkasanStok(daftar) {
  return {
    jumlahJenis: daftar.length,
    totalUnit: daftar.reduce((t, b) => t + b.stok, 0),
    nilaiPersediaan: daftar.reduce((t, b) => t + b.harga * b.stok, 0),
    habis: daftar.filter((b) => statusStok(b.stok) === "habis").length,
    menipis: daftar.filter((b) => statusStok(b.stok) === "menipis").length,
  };
}