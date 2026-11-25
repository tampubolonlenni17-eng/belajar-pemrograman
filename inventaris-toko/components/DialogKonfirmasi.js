"use client";
import Tombol from "./Tombol";

export default function DialogKonfirmasi({ judul, pesan, onYa, onBatal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-judul"
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 id="dialog-judul" className="text-lg font-bold">{judul}</h2>
        <p className="mt-2 text-slate-600">{pesan}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Tombol type="button" varian="garis" onClick={onBatal} autoFocus>Batal</Tombol>
          <Tombol type="button" varian="bahaya" onClick={onYa}>Ya, hapus</Tombol>
        </div>
      </div>
    </div>
  );
}