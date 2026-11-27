"use client";

import { useFetch } from "@/hooks/useFetch";
import { KeranjangProvider } from "@/context/KeranjangContext";
import Kasir from "./Kasir";
import Tombol from "../Tombol";

export default function HalamanKasir({ sumber = "/data/barang.json" }) {
  const { data, memuat, galat, muatUlang } = useFetch(sumber);

  if (memuat) {
    return (
      <p aria-busy="true" className="text-slate-600">
        Memuat data barang…
      </p>
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

  return (
    <KeranjangProvider>
      <Kasir barangAwal={data} />
    </KeranjangProvider>
  );
}