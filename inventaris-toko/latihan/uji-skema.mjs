import { skemaBarang, buatSkemaPembayaran, galatPerKolom } from "../lib/skema.js";

console.log(
  galatPerKolom(skemaBarang.safeParse({ kode: "atk-1", nama: "ab", kategori: "", harga: "", stok: "-1", satuan: " " })),
);

console.log(
  skemaBarang.safeParse({
    kode: "ATK-004",
    nama: "Penggaris",
    kategori: "Alat Tulis",
    harga: "7000",
    stok: "10",
    satuan: "pcs",
  }).data,
);

const sp = buatSkemaPembayaran(58500);
console.log(galatPerKolom(sp.safeParse({ pelanggan: "", metode: "tunai", bayar: "50000" })));
console.log(sp.safeParse({ pelanggan: " Budi ", metode: "tunai", bayar: "100000" }).data);
console.log(sp.safeParse({ pelanggan: "", metode: "qris", bayar: "" }).success);
