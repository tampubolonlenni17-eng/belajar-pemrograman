"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useKeranjang } from "@/context/KeranjangContext";
import { formatRupiah } from "@/lib/format";

export default function PilihBarang({ daftar }) {
  const [kata, setKata] = useState("");
  const { item, tambah } = useKeranjang();

  const k = kata.trim().toLowerCase();
  const tampil = daftar.filter((b) => !k || b.nama.toLowerCase().includes(k) || b.kode.toLowerCase().includes(k));

  return (
    <div className="space-y-3">
      <label className="relative block">
        <span className="sr-only">Cari barang</span>
        <Search size={16} className="absolute left-3 top-3 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari nama atau kode…"
          className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3"
        />
      </label>

      <ul className="grid gap-2 sm:grid-cols-2">
        {tampil.map((b) => {
          const diKeranjang = item.find((i) => i.id === b.id)?.jumlah ?? 0;
          const sisa = b.stok - diKeranjang;
          return (
            <li
              key={b.id}
              className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-3"
            >
              <div>
                <p className="font-medium">{b.nama}</p>
                <p className="text-sm text-slate-500">
                  {formatRupiah(b.harga)} · sisa {sisa} {b.satuan}
                </p>
              </div>
              <button
                onClick={() => tambah(b)}
                disabled={sisa <= 0}
                aria-label={`Tambah ${b.nama} ke keranjang`}
                className="rounded-lg bg-teal-700 p-2 text-white hover:bg-teal-800 disabled:bg-slate-300"
              >
                <Plus size={18} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>

      {tampil.length === 0 && <p className="text-slate-500">Tidak ada barang yang cocok.</p>}
    </div>
  );
}
