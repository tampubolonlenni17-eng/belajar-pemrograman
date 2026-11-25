import { Package, Pencil, Trash2 } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import LabelStok from "./LabelStok";
import Tombol from "./Tombol";

export default function KartuBarang({ barang }) {
  const { kode, nama, harga, stok, satuan } = barang;
  const habis = stok === 0;
  return (
    <article
      className={`flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${
        habis ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <Package className="text-teal-700" aria-hidden="true" />
        <LabelStok stok={stok} />
      </div>
      <div>
        <p className="text-xs text-slate-500">{kode}</p>
        <h3 className="font-semibold">{nama}</h3>
      </div>
      <p className="mt-auto text-lg font-bold">
        {formatRupiah(harga)}{" "}
        <span className="text-sm font-normal text-slate-500">/ {satuan}</span>
      </p>
      <div className="flex gap-2 border-t border-slate-100 pt-3">
        <Tombol varian="garis" ikon={Pencil}>Ubah</Tombol>
        <Tombol varian="bahaya" ikon={Trash2}>Hapus</Tombol>
      </div>
    </article>
  );
}