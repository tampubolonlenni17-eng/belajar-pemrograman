"use client";
import { Search } from "lucide-react";
import { KATEGORI } from "@/lib/data-barang";
import { PILIHAN_URUT } from "@/lib/kueri";

export default function KontrolDaftar({ kueri, onUbah }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <label className="relative">
        <span className="sr-only">Cari nama atau kode</span>
        <Search size={16} className="absolute left-3 top-3 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={kueri.kata}
          onChange={(e) => onUbah({ kata: e.target.value })}
          placeholder="Cari nama atau kode…"
          className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3"
        />
      </label>
      <label className="flex flex-col">
        <span className="sr-only">Kategori</span>
        <select
          value={kueri.kategori}
          onChange={(e) => onUbah({ kategori: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="">Semua kategori</option>
          {KATEGORI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col">
        <span className="sr-only">Urutkan</span>
        <select
          value={kueri.urut}
          onChange={(e) => onUbah({ urut: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          {Object.entries(PILIHAN_URUT).map(([nilai, p]) => (
            <option key={nilai} value={nilai}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col">
        <span className="sr-only">Jumlah per halaman</span>
        <select
          value={kueri.perHalaman}
          onChange={(e) => onUbah({ perHalaman: Number(e.target.value) })}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n}>
              {n} per halaman
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
