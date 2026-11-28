import { describe, it, expect } from "vitest";
import {
  linearSearch,
  binarySearch,
  bubbleSort,
  selectionSort,
  insertionSort,
  urutkanBerdasarkan,
} from "@/lib/algoritma";

const TERURUT = [3, 8, 15, 21, 34, 42, 57, 63, 78, 91];

describe("pencarian", () => {
  it("linearSearch menemukan indeks dan menghitung langkah", () => {
    expect(linearSearch([7, 3, 9, 1], 9)).toEqual({ indeks: 2, langkah: 3 });
  });

  it("linearSearch tidak ketemu → -1 setelah memeriksa semua", () => {
    expect(linearSearch([7, 3, 9, 1], 5)).toEqual({ indeks: -1, langkah: 4 });
  });

  it.each([
    [42, 5],
    [3, 0],
    [91, 9],
  ])("binarySearch(%i) → indeks %i", (target, indeks) => {
    expect(binarySearch(TERURUT, target).indeks).toBe(indeks);
  });

  it("binarySearch paling banyak ⌈log2(n+1)⌉ langkah", () => {
    for (const t of [...TERURUT, 0, 100]) expect(binarySearch(TERURUT, t).langkah).toBeLessThanOrEqual(4);
  });

  it("binarySearch pada array kosong", () => {
    expect(binarySearch([], 1)).toEqual({ indeks: -1, langkah: 0 });
  });
});

describe.each([
  ["bubbleSort", bubbleSort],
  ["selectionSort", selectionSort],
  ["insertionSort", insertionSort],
])("%s", (_, urut) => {
  it("mengurutkan naik termasuk nilai kembar dan negatif", () => {
    expect(urut([5, -2, 9, 5, 0, 3]).hasil).toEqual([-2, 0, 3, 5, 5, 9]);
  });

  it("tidak mengubah array masukan", () => {
    const asli = [3, 1, 2];
    urut(asli);
    expect(asli).toEqual([3, 1, 2]);
  });

  it("array kosong dan satu elemen", () => {
    expect(urut([]).hasil).toEqual([]);
    expect(urut([7]).hasil).toEqual([7]);
  });
});

describe("kasus terbaik", () => {
  it("bubbleSort pada data terurut berhenti setelah 1 putaran (n − 1 perbandingan)", () => {
    expect(bubbleSort([1, 2, 3, 4, 5]).perbandingan).toBe(4);
  });

  it("selectionSort selalu n(n − 1)/2 perbandingan", () => {
    expect(selectionSort([1, 2, 3, 4, 5]).perbandingan).toBe(10);
  });
});

describe("urutkanBerdasarkan", () => {
  it("mengurutkan objek berdasarkan kolom angka dan stabil untuk nilai sama", () => {
    const data = [
      { n: "A", harga: 5 },
      { n: "B", harga: 2 },
      { n: "C", harga: 5 },
    ];
    expect(urutkanBerdasarkan(data, "harga").map((d) => d.n)).toEqual(["B", "A", "C"]);
  });
});
