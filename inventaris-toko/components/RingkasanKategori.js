import { formatRupiah } from "@/lib/format";

export default function RingkasanKategori({ ringkasan }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {ringkasan.map((r) => (
        <div
          key={r.kategori}
          className="rounded-xl border border-slate-200 bg-white p-4"
        >
          <p className="text-sm text-slate-500">{r.kategori}</p>
          <p className="font-semibold">{r.jumlah} barang</p>
          <p className="text-sm text-teal-700">{formatRupiah(r.nilai)}</p>
        </div>
      ))}
    </div>
  );
}