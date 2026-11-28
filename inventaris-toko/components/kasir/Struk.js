"use client";

import { formatRupiah } from "@/lib/format";
import Tombol from "../Tombol";

export default function Struk({ data, onSelesai }) {
  return (
    <div
      className="mx-auto max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 font-mono text-sm"
      role="status"
    >
      <div className="text-center">
        <p className="text-base font-bold">Transaksi berhasil</p>
        <p>
          {data.nomor} · {data.waktu}
        </p>
        <p>Pelanggan: {data.pelanggan}</p>
      </div>

      <ul className="space-y-1 border-y border-dashed border-slate-300 py-2">
        {data.item.map((i) => (
          <li key={i.id} className="flex justify-between gap-2">
            <span>
              {i.nama} × {i.jumlah}
            </span>
            <span>{formatRupiah(i.harga * i.jumlah)}</span>
          </li>
        ))}
      </ul>

      <dl className="space-y-1">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{formatRupiah(data.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Diskon {data.persen}%</dt>
          <dd>− {formatRupiah(data.diskon)}</dd>
        </div>
        <div className="flex justify-between font-bold">
          <dt>Total</dt>
          <dd>{formatRupiah(data.total)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Bayar ({data.metode.toUpperCase()})</dt>
          <dd>{formatRupiah(data.bayar)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Kembalian</dt>
          <dd>{formatRupiah(data.kembalian)}</dd>
        </div>
      </dl>

      <div className="text-center font-sans">
        <Tombol onClick={onSelesai}>Transaksi baru</Tombol>
      </div>
    </div>
  );
}
