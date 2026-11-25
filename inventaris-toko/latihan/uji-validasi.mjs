import { validasiBarang } from "../lib/validasi.js";
import { daftarBarang } from "../lib/data-barang.js";

console.log(validasiBarang({ kode: "", nama: "", kategori: "", harga: "", stok: "", satuan: "" }, daftarBarang));
console.log(validasiBarang({ kode: "atk-4", nama: "Pe", kategori: "Alat Tulis", harga: "-5", stok: "1.5", satuan: "pcs" }, daftarBarang));
console.log(validasiBarang({ kode: "ATK-001", nama: "Pena", kategori: "Alat Tulis", harga: "2500", stok: "10", satuan: "pcs" }, daftarBarang));
console.log(validasiBarang({ kode: "ATK-001", nama: "Buku", kategori: "Alat Tulis", harga: "2500", stok: "0", satuan: "pcs" }, daftarBarang, 1));