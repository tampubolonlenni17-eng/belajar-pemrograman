"use client";
import { useState } from "react";
import { KATEGORI } from "@/lib/data-barang";
import { validasiBarang, adaGalat } from "@/lib/validasi";
import Tombol from "./Tombol";

const KOSONG = { kode: "", nama: "", kategori: "", harga: "", stok: "", satuan: "pcs" };

function Kolom({ id, label, galat, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children}
      {galat && <p id={`${id}-galat`} className="text-sm text-red-700">{galat}</p>}
    </div>
  );
}

export default function FormBarang({ nilaiAwal, daftar, onSimpan, onBatal }) {
  const [isian, setIsian] = useState(
    nilaiAwal
      ? { ...nilaiAwal, harga: String(nilaiAwal.harga), stok: String(nilaiAwal.stok) }
      : KOSONG
  );
  const [galat, setGalat] = useState({});
  const modeEdit = Boolean(nilaiAwal);

  function ubah(e) {
    const { name, value } = e.target;
    setIsian((lama) => ({ ...lama, [name]: name === "kode" ? value.toUpperCase() : value }));
    if (galat[name]) setGalat((lama) => ({ ...lama, [name]: undefined }));
  }

  function kirim(e) {
    e.preventDefault();
    const hasil = validasiBarang(isian, daftar, nilaiAwal?.id ?? null);
    setGalat(hasil);
    if (adaGalat(hasil)) return;
    onSimpan(isian);
    if (!modeEdit) setIsian(KOSONG);
  }

  const kelasInput = (nama) =>
    `rounded-lg border px-3 py-2 ${galat[nama] ? "border-red-500" : "border-slate-300"}`;
  const aria = (nama) => ({
    "aria-invalid": Boolean(galat[nama]),
    "aria-describedby": galat[nama] ? `${nama}-galat` : undefined,
  });

  return (
    <form
      onSubmit={kirim}
      noValidate
      className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2"
    >
      <h2 className="text-lg font-bold sm:col-span-2">
        {modeEdit ? `Edit ${nilaiAwal.nama}` : "Tambah barang"}
      </h2>

      <Kolom id="kode" label="Kode" galat={galat.kode}>
        <input id="kode" name="kode" value={isian.kode} onChange={ubah} placeholder="ATK-004" className={kelasInput("kode")} {...aria("kode")} />
      </Kolom>

      <Kolom id="nama" label="Nama barang" galat={galat.nama}>
        <input id="nama" name="nama" value={isian.nama} onChange={ubah} className={kelasInput("nama")} {...aria("nama")} />
      </Kolom>

      <Kolom id="kategori" label="Kategori" galat={galat.kategori}>
        <select id="kategori" name="kategori" value={isian.kategori} onChange={ubah} className={kelasInput("kategori")} {...aria("kategori")}>
          <option value="">Pilih kategori</option>
          {KATEGORI.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </Kolom>

      <Kolom id="satuan" label="Satuan" galat={galat.satuan}>
        <input id="satuan" name="satuan" value={isian.satuan} onChange={ubah} className={kelasInput("satuan")} {...aria("satuan")} />
      </Kolom>

      <Kolom id="harga" label="Harga (Rp)" galat={galat.harga}>
        <input id="harga" name="harga" type="number" inputMode="numeric" value={isian.harga} onChange={ubah} className={kelasInput("harga")} {...aria("harga")} />
      </Kolom>

      <Kolom id="stok" label="Stok" galat={galat.stok}>
        <input id="stok" name="stok" type="number" inputMode="numeric" value={isian.stok} onChange={ubah} className={kelasInput("stok")} {...aria("stok")} />
      </Kolom>

      <div className="flex gap-2 sm:col-span-2">
        <Tombol type="submit">{modeEdit ? "Simpan perubahan" : "Tambah barang"}</Tombol>
        {modeEdit && (
          <Tombol type="button" varian="garis" onClick={onBatal}>Batal</Tombol>
        )}
      </div>
    </form>
  );
}