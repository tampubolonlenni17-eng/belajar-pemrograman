// lib/validasi.js — validasi data barang. Mengembalikan objek galat; kosong berarti valid.
export function validasiBarang(data, daftar = [], idSedangDiedit = null) {
  const galat = {};
  const kode = String(data.kode ?? "").trim();
  const nama = String(data.nama ?? "").trim();

  if (!kode) galat.kode = "Kode wajib diisi.";
  else if (!/^[A-Z]{3}-\d{3}$/.test(kode))
    galat.kode = "Format kode: 3 huruf besar, tanda hubung, 3 angka. Contoh ATK-004.";
  else if (daftar.some((b) => b.kode === kode && b.id !== idSedangDiedit))
    galat.kode = "Kode sudah dipakai barang lain.";

  if (!nama) galat.nama = "Nama wajib diisi.";
  else if (nama.length < 3) galat.nama = "Nama minimal 3 karakter.";

  if (!data.kategori) galat.kategori = "Pilih kategori.";

  const harga = Number(data.harga);
  if (data.harga === "" || data.harga === null || data.harga === undefined)
    galat.harga = "Harga wajib diisi.";
  else if (!Number.isInteger(harga) || harga <= 0)
    galat.harga = "Harga harus bilangan bulat lebih dari 0.";

  const stok = Number(data.stok);
  if (data.stok === "" || data.stok === null || data.stok === undefined)
    galat.stok = "Stok wajib diisi.";
  else if (!Number.isInteger(stok) || stok < 0)
    galat.stok = "Stok harus bilangan bulat 0 atau lebih.";

  if (!String(data.satuan ?? "").trim()) galat.satuan = "Satuan wajib diisi.";

  return galat;
}

export const adaGalat = (galat) => Object.keys(galat).length > 0;