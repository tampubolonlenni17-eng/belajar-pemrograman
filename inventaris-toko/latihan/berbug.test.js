import { describe, it, expect } from "vitest";
import { hitungSubtotal, persenDiskonSederhana, rataRataHarga, cariNama, jumlahHalaman } from "./berbug";

const ITEM = [
  { nama: "Sabun Mandi", harga: 4500, jumlah: 2 },
  { nama: "Teh Botol", harga: 6000, jumlah: 3 },
];

describe("latihan berbug", () => {
  it("hitungSubtotal menjumlah harga × jumlah", () => {
    expect(hitungSubtotal(ITEM)).toBe(27000);
  });

  it("hitungSubtotal keranjang kosong = 0", () => {
    expect(hitungSubtotal([])).toBe(0);
  });

  it.each([
    [49999, 0],
    [50000, 5],
    [100000, 10],
  ])("persenDiskonSederhana(%i) = %i", (s, p) => {
    expect(persenDiskonSederhana(s)).toBe(p);
  });

  it("rataRataHarga", () => {
    expect(rataRataHarga(ITEM)).toBe(5250);
  });

  it("rataRataHarga daftar kosong = 0", () => {
    expect(rataRataHarga([])).toBe(0);
  });

  it("cariNama tidak peka huruf besar/kecil", () => {
    expect(cariNama(ITEM, "sabun")).toHaveLength(1);
  });

  it.each([
    [12, 5, 3],
    [10, 5, 2],
    [0, 5, 1],
  ])("jumlahHalaman(%i, %i) = %i", (t, p, h) => {
    expect(jumlahHalaman(t, p)).toBe(h);
  });
});
