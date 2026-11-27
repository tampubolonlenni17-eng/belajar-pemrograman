"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useKeranjang } from "@/context/KeranjangContext";
import { formatRupiah } from "@/lib/format";

export default function Keranjang() {
  const { item, ubahJumlah, hapus } = useKeranjang();

  if (item.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-slate-500">
        Keranjang masih kosong.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {item.map((i) => (
        <li key={i.id} className="flex items-center gap-2 p-3">
          <div className="flex-1">
            <p className="font-medium">{i.nama}</p>
            <p className="text-sm text-slate-500">
              {formatRupiah(i.harga)} × {i.jumlah} = {formatRupiah(i.harga * i.jumlah)}
            </p>
          </div>
          <button
            onClick={() => ubahJumlah(i.id, i.jumlah - 1)}
            aria-label={`Kurangi ${i.nama}`}
            className="rounded border border-slate-300 p-1"
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          <input
            type="number"
            min={1}
            max={i.stok}
            value={i.jumlah}
            onChange={(e) => ubahJumlah(i.id, e.target.value)}
            aria-label={`Jumlah ${i.nama}`}
            className="w-14 rounded border border-slate-300 px-1 py-1 text-center"
          />
          <button
            onClick={() => ubahJumlah(i.id, i.jumlah + 1)}
            disabled={i.jumlah >= i.stok}
            aria-label={`Tambah ${i.nama}`}
            className="rounded border border-slate-300 p-1 disabled:opacity-40"
          >
            <Plus size={14} aria-hidden="true" />
          </button>
          <button
            onClick={() => hapus(i.id)}
            aria-label={`Hapus ${i.nama} dari keranjang`}
            className="rounded p-1 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}