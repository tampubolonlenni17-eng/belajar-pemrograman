import { describe, it, expect } from "vitest";
import { statusStok, ringkasanStok, kelompokkanPerKategori, tambahBarang, ubahBarang, hapusBarang } from "@/lib/barang";
import { validasiBarang, adaGalat } from "@/lib/validasi";
import { formatRupiah } from "@/lib/format";
import { daftarBarang } from "@/lib/data-barang";

describe("statusStok (batas menipis = 10)", () => {
  it.each([
    [0, "habis"],
    [1, "menipis"],
    [9, "menipis"],
    [10, "tersedia"],
    [120, "tersedia"],
  ])("stok %i → %s", (stok, status) => {
    expect(statusStok(stok)).toBe(status);
  });
});

describe("ringkasanStok", () => {
  it("menghitung statistik 12 barang contoh", () => {
    expect(ringkasanStok(daftarBarang)).toEqual({
      jumlahJenis: 12,
      totalUnit: 547,
      nilaiPersediaan: 2425000,
      habis: 2,
      menipis: 3,
    });
  });

  it("daftar kosong bernilai nol semua", () => {
    expect(ringkasanStok([])).toEqual({ jumlahJenis: 0, totalUnit: 0, nilaiPersediaan: 0, habis: 0, menipis: 0 });
  });
});

describe("kelompokkanPerKategori", () => {
  it("membagi 12 barang ke 4 kategori, masing-masing 3", () => {
    const g = kelompokkanPerKategori(daftarBarang);
    expect(Object.keys(g)).toEqual(["Alat Tulis", "Makanan", "Minuman", "Kebersihan"]);
    expect(Object.values(g).map((a) => a.length)).toEqual([3, 3, 3, 3]);
  });
});

describe("tambah, ubah, hapus barang", () => {
  const isian = {
    kode: " ATK-004 ",
    nama: "Penggaris",
    kategori: "Alat Tulis",
    harga: "7000",
    stok: "10",
    satuan: "pcs",
  };

  it("tambahBarang memberi id berikutnya dan merapikan tipe", () => {
    const hasil = tambahBarang(daftarBarang, isian);
    expect(hasil).toHaveLength(13);
    expect(hasil.at(-1)).toEqual({
      id: 13,
      kode: "ATK-004",
      nama: "Penggaris",
      kategori: "Alat Tulis",
      harga: 7000,
      stok: 10,
      satuan: "pcs",
    });
    expect(daftarBarang).toHaveLength(12);
  });

  it("tambahBarang pada daftar kosong memberi id 1", () => {
    expect(tambahBarang([], isian)[0].id).toBe(1);
  });

  it("ubahBarang hanya mengganti barang dengan id itu", () => {
    const hasil = ubahBarang(daftarBarang, 2, { ...isian, kode: "ATK-002", stok: "50" });
    expect(hasil.find((b) => b.id === 2)).toMatchObject({ stok: 50, nama: "Penggaris" });
    expect(hasil.find((b) => b.id === 1)).toBe(daftarBarang[0]);
  });

  it("hapusBarang mengembalikan array baru tanpa barang itu", () => {
    const hasil = hapusBarang(daftarBarang, 2);
    expect(hasil.some((b) => b.id === 2)).toBe(false);
    expect(hasil).not.toBe(daftarBarang);
  });
});

describe("validasiBarang", () => {
  const valid = {
    kode: "ATK-004",
    nama: "Penggaris",
    kategori: "Alat Tulis",
    harga: "7000",
    stok: "10",
    satuan: "pcs",
  };

  it("data valid tidak punya galat", () => {
    expect(adaGalat(validasiBarang(valid, daftarBarang))).toBe(false);
  });

  it("kode yang sudah dipakai ditolak", () => {
    expect(validasiBarang({ ...valid, kode: "ATK-001" }, daftarBarang).kode).toBe("Kode sudah dipakai barang lain.");
  });

  it("saat edit, barang boleh memakai kodenya sendiri", () => {
    expect(validasiBarang({ ...valid, kode: "ATK-001" }, daftarBarang, 1).kode).toBeUndefined();
  });

  it("semua kolom kosong menghasilkan 6 galat", () => {
    const galat = validasiBarang({ kode: "", nama: "", kategori: "", harga: "", stok: "", satuan: "" });
    expect(Object.keys(galat)).toHaveLength(6);
  });
});

describe("formatRupiah", () => {
  // Intl memakai spasi tak terputus (U+00A0) setelah "Rp": samakan dulu sebelum membandingkan
  const rapi = (s) => s.replace(/\s/g, " ");

  it.each([
    [15000, "Rp 15.000"],
    [2425000, "Rp 2.425.000"],
    [0, "Rp 0"],
  ])("%i → %s", (n, teks) => {
    expect(rapi(formatRupiah(n))).toBe(teks);
  });
});
