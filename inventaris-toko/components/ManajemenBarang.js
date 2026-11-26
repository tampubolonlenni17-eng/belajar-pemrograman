"use client";
import { useEffect, useState } from "react";
import { Boxes, PackageX, Pencil, Trash2, TriangleAlert, Wallet } from "lucide-react";
import FormBarang from "./FormBarang";
import KontrolDaftar from "./KontrolDaftar";
import Paginasi from "./Paginasi";
import Tombol from "./Tombol";
import DialogKonfirmasi from "./DialogKonfirmasi";
import KartuStatistik from "./KartuStatistik";
import LabelStok from "./LabelStok";
import TabelData from "./TabelData";
import { ringkasanStok, tambahBarang, ubahBarang, hapusBarang } from "@/lib/barang";
import { formatRupiah } from "@/lib/format";
import { terapkanKueri } from "@/lib/kueri";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";

const KUERI_AWAL = { kata: "", kategori: "", urut: "nama-naik", halaman: 1 };

export default function ManajemenBarang({ barangAwal }) {
  const [daftar, setDaftar] = useLocalStorage("inventaris:barang", barangAwal);
  const [diedit, setDiedit] = useState(null);
  const [akanDihapus, setAkanDihapus] = useState(null);
  const [pesan, setPesan] = useState("");
  const [kueri, setKueri] = useState(KUERI_AWAL);

  const kataTunda = useDebounce(kueri.kata, 300);

  const ringkas = ringkasanStok(daftar); // dihitung dari seluruh daftar
  const hasil = terapkanKueri(daftar, { ...kueri, kata: kataTunda });

  // Judul tab browser mengikuti jumlah barang
  useEffect(() => {
    document.title = `Inventaris (${daftar.length} barang)`;
  }, [daftar.length]);

  // Mengubah filter selalu kembali ke halaman 1; pindah halaman hanya mengubah halaman
  const ubahKueri = (perubahan) => setKueri((lama) => ({ ...lama, ...perubahan, halaman: 1 }));
  const pindahHalaman = (h) => setKueri((lama) => ({ ...lama, halaman: h }));

  function kembalikanDataAwal() {
    setDaftar(barangAwal);
    setKueri(KUERI_AWAL);
    setPesan("Data dikembalikan ke 12 barang awal.");
  }

  function simpan(isian) {
    if (diedit) {
      setDaftar((lama) => ubahBarang(lama, diedit.id, isian));
      setPesan(`${isian.nama} berhasil diperbarui.`);
      setDiedit(null);
    } else {
      setDaftar((lama) => tambahBarang(lama, isian));
      setPesan(`${isian.nama} berhasil ditambahkan.`);
    }
  }

  function konfirmasiHapus() {
    setDaftar((lama) => hapusBarang(lama, akanDihapus.id));
    setPesan(`${akanDihapus.nama} dihapus.`);
    if (diedit?.id === akanDihapus.id) setDiedit(null);
    setAkanDihapus(null);
  }

  const kolom = [
    { kunci: "kode", judul: "Kode" },
    { kunci: "nama", judul: "Nama barang" },
    { kunci: "kategori", judul: "Kategori" },
    { kunci: "harga", judul: "Harga", rataKanan: true, tampil: (b) => formatRupiah(b.harga) },
    { kunci: "stok", judul: "Stok", tampil: (b) => <LabelStok stok={b.stok} /> },
    {
      kunci: "aksi",
      judul: "Aksi",
      tampil: (b) => (
        <div className="flex gap-1">
          <button
            onClick={() => setDiedit(b)}
            className="rounded p-2 text-teal-700 hover:bg-teal-50"
            aria-label={`Edit ${b.nama}`}
          >
            <Pencil size={16} aria-hidden="true" />
          </button>
          <button
            onClick={() => setAkanDihapus(b)}
            className="rounded p-2 text-red-600 hover:bg-red-50"
            aria-label={`Hapus ${b.nama}`}
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KartuStatistik label="Jenis barang" nilai={ringkas.jumlahJenis} ikon={Boxes} />
        <KartuStatistik label="Nilai persediaan" nilai={formatRupiah(ringkas.nilaiPersediaan)} ikon={Wallet} />
        <KartuStatistik label="Stok menipis" nilai={ringkas.menipis} ikon={TriangleAlert} peringatan={ringkas.menipis > 0} />
        <KartuStatistik label="Stok habis" nilai={ringkas.habis} ikon={PackageX} peringatan={ringkas.habis > 0} />
      </div>

      <FormBarang
        key={diedit?.id ?? "baru"}
        nilaiAwal={diedit}
        daftar={daftar}
        onSimpan={simpan}
        onBatal={() => setDiedit(null)}
      />

      {pesan && (
        <p role="status" className="rounded-lg bg-emerald-50 px-4 py-2 text-emerald-800">
          {pesan}
        </p>
      )}

      <KontrolDaftar kueri={kueri} onUbah={ubahKueri} />

      <p className="text-sm text-slate-600" aria-live="polite">
        {hasil.total === daftar.length
          ? `${hasil.total} barang`
          : `${hasil.total} dari ${daftar.length} barang cocok`}
      </p>

      <TabelData
        kolom={kolom}
        data={hasil.data}
        pesanKosong={
          daftar.length === 0
            ? "Belum ada barang. Tambahkan lewat form di atas."
            : "Tidak ada barang yang cocok dengan pencarian."
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Paginasi halaman={hasil.halaman} totalHalaman={hasil.totalHalaman} onPindah={pindahHalaman} />
        <Tombol varian="garis" type="button" onClick={kembalikanDataAwal}>
          Kembalikan data awal
        </Tombol>
      </div>

      {akanDihapus && (
        <DialogKonfirmasi
          judul="Hapus barang?"
          pesan={`${akanDihapus.nama} (${akanDihapus.kode}) akan dihapus dari daftar.`}
          onYa={konfirmasiHapus}
          onBatal={() => setAkanDihapus(null)}
        />
      )}
    </div>
  );
}