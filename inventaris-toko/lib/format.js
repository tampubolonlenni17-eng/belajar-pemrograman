// lib/format.js — format tampilan angka.

/**
 * Format angka menjadi teks rupiah tanpa desimal.
 * Catatan: Intl memakai spasi tak terputus (U+00A0) setelah "Rp".
 * @param {number} n Nilai dalam rupiah
 * @returns {string} Contoh: "Rp 15.000"
 * @example formatRupiah(2425000); // "Rp 2.425.000"
 */
export function formatRupiah(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}
