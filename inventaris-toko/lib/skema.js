// lib/skema.js — skema validasi dengan Zod. Dipakai di form klien (P7) dan nanti di server (P11, P14).

import { z } from "zod";
import { KATEGORI } from "./data-barang.js";

/** Skema data barang dari form; harga dan stok diubah menjadi angka. */
export const skemaBarang = z.object({
  kode: z
    .string()
    .trim()
    .min(1, "Kode wajib diisi.")
    .regex(/^[A-Z]{3}-\d{3}$/, "Format kode: 3 huruf besar, tanda hubung, 3 angka. Contoh ATK-004."),
  nama: z.string().trim().min(1, "Nama wajib diisi.").min(3, "Nama minimal 3 karakter."),
  kategori: z.enum(KATEGORI, { error: "Pilih kategori." }),
  harga: z.coerce
    .number({ error: "Harga wajib diisi." })
    .int("Harga harus bilangan bulat.")
    .positive("Harga harus lebih dari 0."),
  stok: z.coerce
    .number({ error: "Stok wajib diisi." })
    .int("Stok harus bilangan bulat.")
    .min(0, "Stok tidak boleh negatif."),
  satuan: z.string().trim().min(1, "Satuan wajib diisi."),
});

/** Metode pembayaran yang diterima kasir. */
export const METODE_BAYAR = ["tunai", "qris"];

/**
 * Buat skema pembayaran. Bergantung pada total belanja, jadi dibuat lewat fungsi.
 * @param {number} total Total yang harus dibayar
 * @returns {import("zod").ZodType} Skema Zod untuk {pelanggan, metode, bayar}
 */
export function buatSkemaPembayaran(total) {
  return z
    .object({
      pelanggan: z.string().trim().max(50, "Nama pelanggan maksimal 50 karakter."),
      metode: z.enum(METODE_BAYAR, { error: "Pilih metode pembayaran." }),
      bayar: z.coerce
        .number({ error: "Isi jumlah uang." })
        .int("Jumlah uang harus bilangan bulat.")
        .min(0, "Jumlah uang tidak boleh negatif."),
    })
    .refine((d) => d.metode !== "tunai" || d.bayar >= total, {
      message: "Uang yang dibayar kurang dari total.",
      path: ["bayar"],
    });
}

/**
 * Ubah daftar issue Zod menjadi objek { namaKolom: pesan } (pesan pertama per kolom).
 * @param {{success:boolean, error?:{issues:Array<{path:Array<string|number>, message:string}>}}} hasil Hasil safeParse
 * @returns {Record<string, string>} Objek kosong jika valid
 */
export function galatPerKolom(hasil) {
  if (hasil.success) return {};
  const galat = {};
  for (const issue of hasil.error.issues) {
    const kolom = issue.path[0];
    if (kolom && !galat[kolom]) galat[kolom] = issue.message;
  }
  return galat;
}
