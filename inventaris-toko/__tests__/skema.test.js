import { describe, it, expect } from "vitest";
import { skemaBarang, buatSkemaPembayaran, galatPerKolom } from "@/lib/skema";

const VALID = { kode: "ATK-004", nama: "Penggaris", kategori: "Alat Tulis", harga: "7000", stok: "10", satuan: "pcs" };

describe("skemaBarang", () => {
  it("menerima data valid dan mengubah harga/stok menjadi angka", () => {
    const hasil = skemaBarang.safeParse(VALID);
    expect(hasil.success).toBe(true);
    expect(hasil.data).toMatchObject({ harga: 7000, stok: 10 });
  });

  it("membuang spasi di tepi teks", () => {
    expect(skemaBarang.parse({ ...VALID, nama: " Penggaris " }).nama).toBe("Penggaris");
  });

  it.each([
    ["kode", "atk-004", "Format kode"],
    ["kode", "ATK-4", "Format kode"],
    ["nama", "Pe", "minimal 3"],
    ["kategori", "Elektronik", "Pilih kategori"],
    ["harga", "0", "lebih dari 0"],
    ["harga", "7500.5", "bilangan bulat"],
    ["stok", "-1", "tidak boleh negatif"],
    ["satuan", " ", "wajib diisi"],
  ])('menolak %s = %j dengan pesan "%s"', (kolom, nilai, pesan) => {
    const galat = galatPerKolom(skemaBarang.safeParse({ ...VALID, [kolom]: nilai }));
    expect(galat[kolom]).toContain(pesan);
  });

  it("stok 0 boleh (barang habis tetap tercatat)", () => {
    expect(skemaBarang.safeParse({ ...VALID, stok: "0" }).success).toBe(true);
  });
});

describe("buatSkemaPembayaran", () => {
  const skema = buatSkemaPembayaran(58500);

  it("tunai: uang kurang ditolak di kolom bayar", () => {
    expect(galatPerKolom(skema.safeParse({ pelanggan: "", metode: "tunai", bayar: "58499" }))).toEqual({
      bayar: "Uang yang dibayar kurang dari total.",
    });
  });

  it("tunai: uang pas diterima", () => {
    expect(skema.safeParse({ pelanggan: "", metode: "tunai", bayar: "58500" }).success).toBe(true);
  });

  it("QRIS: kolom bayar boleh kosong", () => {
    expect(skema.safeParse({ pelanggan: "", metode: "qris", bayar: "" }).success).toBe(true);
  });

  it("nama pelanggan lebih dari 50 karakter ditolak", () => {
    const galat = galatPerKolom(skema.safeParse({ pelanggan: "a".repeat(51), metode: "qris", bayar: "" }));
    expect(galat.pelanggan).toMatch(/maksimal 50/);
  });
});
