"use client";
import { useState } from "react";

export default function Penghitung({ awal = 0, langkah = 1 }) {
  const [jumlah, setJumlah] = useState(awal);
  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <button
        className="h-9 w-9 rounded-lg bg-slate-200 font-bold disabled:opacity-40"
        onClick={() => setJumlah((j) => j - langkah)}
        disabled={jumlah <= 0}
        aria-label="Kurangi"
      >
        −
      </button>
      <span className="w-10 text-center text-lg font-bold tabular-nums">{jumlah}</span>
      <button
        className="h-9 w-9 rounded-lg bg-teal-700 font-bold text-white"
        onClick={() => setJumlah((j) => j + langkah)}
        aria-label="Tambah"
      >
        +
      </button>
    </div>
  );
}