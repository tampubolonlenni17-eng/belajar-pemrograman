"use client";

export default function Paginasi({ halaman, totalHalaman, onPindah }) {
  if (totalHalaman <= 1) return null;
  const nomor = Array.from({ length: totalHalaman }, (_, i) => i + 1);

  return (
    <nav aria-label="Halaman" className="flex items-center gap-1">
      <button
        onClick={() => onPindah(halaman - 1)}
        disabled={halaman === 1}
        className="rounded-lg border border-slate-300 px-3 py-1 disabled:opacity-40"
      >
        ‹ Sebelumnya
      </button>
      {nomor.map((n) => (
        <button
          key={n}
          onClick={() => onPindah(n)}
          aria-current={n === halaman ? "page" : undefined}
          className={`h-9 w-9 rounded-lg border ${
            n === halaman ? "border-teal-700 bg-teal-700 text-white" : "border-slate-300"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onPindah(halaman + 1)}
        disabled={halaman === totalHalaman}
        className="rounded-lg border border-slate-300 px-3 py-1 disabled:opacity-40"
      >
        Berikutnya ›
      </button>
    </nav>
  );
}