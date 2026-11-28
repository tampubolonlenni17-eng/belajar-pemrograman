"use client";

import { useKeranjang } from "@/context/KeranjangContext";
import { menujuDiskonBerikutnya } from "@/lib/keranjang";
import { formatRupiah } from "@/lib/format";

export default function RingkasanBelanja() {
  const { ringkasan } = useKeranjang();
  const berikut = menujuDiskonBerikutnya(ringkasan.subtotal);

  return (
    <dl className="space-y-1 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd>{formatRupiah(ringkasan.subtotal)}</dd>
      </div>
      <div className="flex justify-between text-emerald-700">
        <dt>Diskon {ringkasan.persen}%</dt>
        <dd>−{formatRupiah(ringkasan.diskon)}</dd>
      </div>
      <div className="flex justify-between border-t border-slate-200 pt-2 text-lg font-bold">
        <dt>Total</dt>
        <dd data-uji="total">{formatRupiah(ringkasan.total)}</dd>
      </div>
      {berikut && ringkasan.subtotal > 0 && (
        <p className="pt-1 text-sm text-slate-500">
          Belanja {formatRupiah(berikut.kurang)} lagi untuk diskon {berikut.persen}%.
        </p>
      )}
    </dl>
  );
}
