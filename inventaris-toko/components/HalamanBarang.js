"use client";
import { useFetch } from "@/hooks/useFetch";
import ManajemenBarang from "./ManajemenBarang";
import Tombol from "./Tombol";

export default function HalamanBarang({ sumber = "/data/barang.json" }) {
  const { data, memuat, galat, muatUlang } = useFetch(sumber);

  if (memuat) {
    return (
      <div aria-busy="true" className="space-y-3">
        <p className="text-slate-600">Memuat data barang…</p>
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-12 animate-pulse rounded-lg bg-slate-200" />
        ))}
      </div>
    );
  }

  if (galat) {
    return (
      <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
        <p className="font-semibold">Gagal memuat data barang.</p>
        <p className="text-sm">{galat}</p>
        <div className="mt-3">
          <Tombol onClick={muatUlang}>Coba lagi</Tombol>
        </div>
      </div>
    );
  }

  return <ManajemenBarang barangAwal={data} />;
}