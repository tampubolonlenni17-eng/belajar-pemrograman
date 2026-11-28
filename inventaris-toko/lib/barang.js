// lib/barang.js — fungsi murni untuk data barang
import { BATAS_MENIPIS } from "./data-barang.js";

/**
 * Tentukan status stok sebuah barang.
 * @param {number} stok Jumlah persediaan
 * @param {number} [batas=BATAS_MENIPIS] Di bawah angka ini stok dianggap menipis
 * @returns {"habis" | "menipis" | "tersedia"} Status stok
 * @example statusStok(0); // "habis"
 */
export function statusStok(stok, batas = BATAS_MENIPIS) {
  if (stok === 0) return "habis";
  if (stok < batas) return "menipis";
  return "tersedia";
}

/**
 * Kelompokkan barang per kategori.
 * @param {import("./data-barang.js").Barang[]} daftar Daftar barang
 * @returns {Record<string, import("./data-barang.js").Barang[]>} Contoh: { "Alat Tulis": [...], ... }
 */
export function kelompokkanPerKategori(daftar) {
  return daftar.reduce((hasil, b) => {
    hasil[b.kategori] = [...(hasil[b.kategori] ?? []), b];
    return hasil;
  }, {});
}

/**
 * Hitung ringkasan untuk kartu statistik.
 * @param {import("./data-barang.js").Barang[]} daftar Daftar barang
 * @returns {{jumlahJenis:number, totalUnit:number, nilaiPersediaan:number, habis:number, menipis:number}} Statistik persediaan
 */
export function ringkasanStok(daftar) {
  return {
    jumlahJenis: daftar.length,
    totalUnit: daftar.reduce((t, b) => t + b.stok, 0),
    nilaiPersediaan: daftar.reduce((t, b) => t + b.harga * b.stok, 0),
    habis: daftar.filter((b) => statusStok(b.stok) === "habis").length,
    menipis: daftar.filter((b) => statusStok(b.stok) === "menipis").length,
  };
}

/**
 * Ubah data form (semua teks) menjadi objek barang dengan tipe yang benar.
 * @param {{kode:string, nama:string, kategori:string, harga:string|number, stok:string|number, satuan:string}} data Isian form
 * @returns {Omit<import("./data-barang.js").Barang, "id">} Barang tanpa id
 */
export function rapikanBarang(data) {
  return {
    kode: data.kode.trim(),
    nama: data.nama.trim(),
    kategori: data.kategori,
    harga: Number(data.harga),
    stok: Number(data.stok),
    satuan: data.satuan.trim(),
  };
}

/**
 * Tambah barang baru dengan id berikutnya (id terbesar + 1).
 * @param {import("./data-barang.js").Barang[]} daftar Daftar lama (tidak diubah)
 * @param {object} data Isian form, lihat rapikanBarang
 * @returns {import("./data-barang.js").Barang[]} Array baru
 */
export function tambahBarang(daftar, data) {
  const idBaru = daftar.length === 0 ? 1 : Math.max(...daftar.map((b) => b.id)) + 1;
  return [...daftar, { id: idBaru, ...rapikanBarang(data) }];
}

/**
 * Ganti data barang dengan id tertentu.
 * @param {import("./data-barang.js").Barang[]} daftar Daftar lama (tidak diubah)
 * @param {number} id Id barang yang diedit
 * @param {object} data Isian form, lihat rapikanBarang
 * @returns {import("./data-barang.js").Barang[]} Array baru
 */
export function ubahBarang(daftar, id, data) {
  return daftar.map((b) => (b.id === id ? { ...b, ...rapikanBarang(data) } : b));
}

/**
 * Hapus barang dengan id tertentu.
 * @param {import("./data-barang.js").Barang[]} daftar Daftar lama (tidak diubah)
 * @param {number} id Id barang yang dihapus
 * @returns {import("./data-barang.js").Barang[]} Array baru
 */
export function hapusBarang(daftar, id) {
  return daftar.filter((b) => b.id !== id);
}
