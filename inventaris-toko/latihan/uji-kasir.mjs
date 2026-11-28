import { keranjangReducer as r, KERANJANG_AWAL, hitungRingkasan, persenDiskon, kurangiStok } from "../lib/keranjang.js";
import { daftarBarang as d } from "../lib/data-barang.js";

const b = (id) => d.find((x) => x.id === id);
let s = KERANJANG_AWAL;
s = r(s, { type: "tambah", barang: b(12) });
s = r(s, { type: "tambah", barang: b(12) });
s = r(s, { type: "tambah", barang: b(2) }); // stok 0
console.log(
  "A",
  s.item.map((i) => [i.nama, i.jumlah]),
  hitungRingkasan(s.item),
);

s = r(s, { type: "ubahJumlah", id: 12, jumlah: 4 });
s = r(s, { type: "tambah", barang: b(7) });
console.log("B", hitungRingkasan(s.item));

s = r(s, { type: "ubahJumlah", id: 12, jumlah: 7 });
console.log("C", hitungRingkasan(s.item));

s = r(s, { type: "ubahJumlah", id: 12, jumlah: 14 });
s = r(s, { type: "ubahJumlah", id: 7, jumlah: 2 });
console.log("D", hitungRingkasan(s.item));

s = r(s, { type: "ubahJumlah", id: 12, jumlah: 99 });
console.log("E stok cap", s.item.find((i) => i.id === 12).jumlah, hitungRingkasan(s.item));

let t = KERANJANG_AWAL;
for (let k = 0; k < 5; k++) t = r(t, { type: "tambah", barang: b(11) });
console.log("F pasta", t.item[0].jumlah);

console.log(
  "G",
  r(s, { type: "ubahJumlah", id: 7, jumlah: 0 }).item.length,
  r(s, { type: "hapus", id: 12 }).item.length,
  r(s, { type: "kosongkan" }).item.length,
);

try {
  r(s, { type: "aneh" });
} catch (e) {
  console.log("H", e.message);
}

console.log("I", [49999, 50000, 99999, 100000, 199999, 200000].map(persenDiskon));

const s2 = r(r(KERANJANG_AWAL, { type: "tambah", barang: b(3) }), { type: "ubahJumlah", id: 3, jumlah: 3 });
console.log(
  "J",
  hitungRingkasan(s2.item),
  kurangiStok(d, s2.item).find((x) => x.id === 3).stok,
  d.find((x) => x.id === 3).stok,
);
