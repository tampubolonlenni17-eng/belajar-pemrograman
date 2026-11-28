import { describe, it, expect } from "vitest";
import {
  keranjangReducer,
  KERANJANG_AWAL,
  persenDiskon,
  hitungRingkasan,
  kurangiStok,
  menujuDiskonBerikutnya,
} from "@/lib/keranjang";
import { daftarBarang } from "@/lib/data-barang";

const barang = (id) => daftarBarang.find((b) => b.id === id);
const SABUN = barang(12); // Rp 15.000, stok 22
const AIR = barang(7); // Rp 4.000, stok 48
const PENSIL = barang(2); // stok 0
const PASTA = barang(11); // stok 3

/** Jalankan beberapa aksi berurutan dari keranjang kosong. */
const jalankan = (...aksi) => aksi.reduce(keranjangReducer, KERANJANG_AWAL);

describe("keranjangReducer", () => {
  it("menambah barang baru dengan jumlah 1", () => {
    const s = jalankan({ type: "tambah", barang: SABUN });
    expect(s.item).toHaveLength(1);
    expect(s.item[0]).toMatchObject({ id: 12, nama: "Sabun Cuci Piring", jumlah: 1 });
  });

  it("menambah barang yang sama menaikkan jumlah, bukan baris baru", () => {
    const s = jalankan({ type: "tambah", barang: SABUN }, { type: "tambah", barang: SABUN });
    expect(s.item).toHaveLength(1);
    expect(s.item[0].jumlah).toBe(2);
  });

  it("mengabaikan barang dengan stok 0", () => {
    const s = jalankan({ type: "tambah", barang: PENSIL });
    expect(s.item).toEqual([]);
  });

  it("tidak menambah melebihi stok", () => {
    const aksi = Array.from({ length: 5 }, () => ({ type: "tambah", barang: PASTA }));
    expect(jalankan(...aksi).item[0].jumlah).toBe(3);
  });

  it("ubahJumlah membatasi jumlah sampai stok", () => {
    const s = jalankan({ type: "tambah", barang: SABUN }, { type: "ubahJumlah", id: 12, jumlah: 99 });
    expect(s.item[0].jumlah).toBe(22);
  });

  it.each([0, -3, "", "abc"])("ubahJumlah dengan %j menghapus baris", (jumlah) => {
    const s = jalankan({ type: "tambah", barang: SABUN }, { type: "ubahJumlah", id: 12, jumlah });
    expect(s.item).toEqual([]);
  });

  it("ubahJumlah menerima teks angka dari input", () => {
    const s = jalankan({ type: "tambah", barang: SABUN }, { type: "ubahJumlah", id: 12, jumlah: "4" });
    expect(s.item[0].jumlah).toBe(4);
  });

  it("hapus hanya menghapus barang yang dimaksud", () => {
    const s = jalankan({ type: "tambah", barang: SABUN }, { type: "tambah", barang: AIR }, { type: "hapus", id: 12 });
    expect(s.item.map((i) => i.id)).toEqual([7]);
  });

  it("kosongkan mengembalikan keranjang awal", () => {
    const s = jalankan({ type: "tambah", barang: SABUN }, { type: "kosongkan" });
    expect(s).toEqual(KERANJANG_AWAL);
  });

  it("tidak mengubah state lama (immutable)", () => {
    const lama = jalankan({ type: "tambah", barang: SABUN });
    const salinan = structuredClone(lama);
    keranjangReducer(lama, { type: "tambah", barang: SABUN });
    expect(lama).toEqual(salinan);
  });

  it("melempar galat untuk aksi yang tidak dikenal", () => {
    expect(() => keranjangReducer(KERANJANG_AWAL, { type: "aneh" })).toThrow("Aksi tidak dikenal: aneh");
  });
});

describe("persenDiskon (nilai batas)", () => {
  it.each([
    [0, 0],
    [49999, 0],
    [50000, 5],
    [99999, 5],
    [100000, 10],
    [199999, 10],
    [200000, 15],
    [1000000, 15],
  ])("subtotal %i mendapat diskon %i%%", (subtotal, persen) => {
    expect(persenDiskon(subtotal)).toBe(persen);
  });
});

describe("hitungRingkasan", () => {
  it("keranjang kosong bernilai nol", () => {
    expect(hitungRingkasan([])).toEqual({ jumlahUnit: 0, subtotal: 0, persen: 0, diskon: 0, total: 0 });
  });

  it.each([
    [2, 0, 30000, 0, 30000],
    [4, 1, 64000, 3200, 60800],
    [7, 1, 109000, 10900, 98100],
    [14, 2, 218000, 32700, 185300],
  ])("%i sabun + %i air: subtotal %i, diskon %i, total %i", (nSabun, nAir, subtotal, diskon, total) => {
    const item = [{ ...SABUN, jumlah: nSabun }, ...(nAir ? [{ ...AIR, jumlah: nAir }] : [])];
    expect(hitungRingkasan(item)).toMatchObject({ subtotal, diskon, total, jumlahUnit: nSabun + nAir });
  });

  it("membulatkan diskon ke rupiah terdekat", () => {
    // 99.999 × 5% = 4.999,95 → 5.000
    expect(hitungRingkasan([{ id: 1, harga: 99999, jumlah: 1 }]).diskon).toBe(5000);
  });
});

describe("kurangiStok", () => {
  it("mengurangi stok barang yang dibeli dan tidak menyentuh data asli", () => {
    const hasil = kurangiStok(daftarBarang, [{ id: 12, jumlah: 14 }]);
    expect(hasil.find((b) => b.id === 12).stok).toBe(8);
    expect(SABUN.stok).toBe(22);
    expect(hasil.find((b) => b.id === 7)).toBe(AIR); // yang tidak dibeli tetap objek yang sama
  });
});

describe("menujuDiskonBerikutnya", () => {
  it.each([
    [30000, { kurang: 20000, persen: 5 }],
    [64000, { kurang: 36000, persen: 10 }],
    [150000, { kurang: 50000, persen: 15 }],
    [200000, null],
  ])("subtotal %i → %j", (subtotal, harapan) => {
    expect(menujuDiskonBerikutnya(subtotal)).toEqual(harapan);
  });
});
