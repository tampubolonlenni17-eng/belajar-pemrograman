import { describe, it, expect } from "vitest";
import { terapkanKueri } from "@/lib/kueri";
import { daftarBarang } from "@/lib/data-barang";

const nama = (hasil) => hasil.data.map((b) => b.nama);

describe("terapkanKueri", () => {
  it("bawaan: urut nama, 5 per halaman, 3 halaman", () => {
    const h = terapkanKueri(daftarBarang);
    expect(h).toMatchObject({ total: 12, totalHalaman: 3, halaman: 1 });
    expect(nama(h)).toEqual([
      "Air Mineral 600 ml",
      "Biskuit Kelapa",
      "Buku Tulis 58 Lembar",
      "Kopi Sachet",
      "Mi Instan Goreng",
    ]);
  });

  it("halaman terakhir berisi sisa data", () => {
    expect(nama(terapkanKueri(daftarBarang, { halaman: 3 }))).toEqual(["Spidol Hitam", "Teh Botol"]);
  });

  it("pencarian tidak peka huruf besar/kecil", () => {
    expect(nama(terapkanKueri(daftarBarang, { kata: "SABUN" }))).toEqual(["Sabun Cuci Piring", "Sabun Mandi"]);
  });

  it("pencarian juga mencocokkan kode", () => {
    expect(terapkanKueri(daftarBarang, { kata: "atk" }).total).toBe(3);
  });

  it("filter kategori + urut harga termahal", () => {
    expect(nama(terapkanKueri(daftarBarang, { kategori: "Minuman", urut: "harga-turun" }))).toEqual([
      "Teh Botol",
      "Air Mineral 600 ml",
      "Kopi Sachet",
    ]);
  });

  it("tidak ada yang cocok: total 0, tetap 1 halaman", () => {
    expect(terapkanKueri(daftarBarang, { kata: "zzz" })).toEqual({ data: [], total: 0, totalHalaman: 1, halaman: 1 });
  });

  it.each([
    [0, 1],
    [-2, 1],
    [9, 3],
  ])("halaman %i di luar batas dikoreksi menjadi %i", (halaman, harapan) => {
    expect(terapkanKueri(daftarBarang, { halaman }).halaman).toBe(harapan);
  });

  it("tidak mengubah urutan array asli", () => {
    const sebelum = daftarBarang.map((b) => b.id);
    terapkanKueri(daftarBarang, { urut: "harga-turun" });
    expect(daftarBarang.map((b) => b.id)).toEqual(sebelum);
  });
});

describe("pilihan urut yang belum teruji (ditemukan dari laporan coverage)", () => {
  it("harga-naik: termurah lebih dulu", () => {
    expect(terapkanKueri(daftarBarang, { urut: "harga-naik" }).data[0].nama).toBe("Kopi Sachet");
  });

  it("stok-naik: stok paling sedikit lebih dulu", () => {
    const stok = terapkanKueri(daftarBarang, { urut: "stok-naik" }).data.map((b) => b.stok);
    expect(stok).toEqual([0, 0, 3, 5, 8]);
  });

  it("urut yang tidak dikenal kembali ke nama A–Z", () => {
    expect(terapkanKueri(daftarBarang, { urut: "ngawur" }).data[0].nama).toBe("Air Mineral 600 ml");
  });
});
