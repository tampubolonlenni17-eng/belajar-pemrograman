
import { daftarBarang } from "../lib/barang.js";

// Destructuring
const [pertama, kedua] = daftarBarang;
const { nama, harga, diskon = 0 } = pertama;
console.log(nama, harga, diskon, kedua.nama);

const ringkas = ({ nama, stok }) => `${nama} (${stok})`;
console.log(daftarBarang.map(ringkas).join(", "));

// Operasi immutable
const tambah = (daftar, barang) => [...daftar, barang];

const hapus = (daftar, id) =>
  daftar.filter((b) => b.id !== id);

const ubahStok = (daftar, id, stok) =>
  daftar.map((b) => (b.id === id ? { ...b, stok } : b));

const v1 = tambah(daftarBarang, {
  id: 9,
  nama: "Penghapus",
  kategori: "Alat Tulis",
  harga: 2500,
  stok: 30
});

const v2 = hapus(v1, 2);
const v3 = ubahStok(v2, 5, 25);

console.log(daftarBarang.length, v1.length, v2.length, v3.length);

console.log(
  daftarBarang.find((b) => b.id === 5).stok,
  v3.find((b) => b.id === 5).stok
);

console.log(daftarBarang === v3, daftarBarang[0] === v3[0]);
