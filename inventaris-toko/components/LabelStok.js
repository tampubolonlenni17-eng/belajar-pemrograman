import { statusStok } from "@/lib/barang";

const WARNA = {
  habis: "bg-red-100 text-red-800",
  menipis: "bg-amber-100 text-amber-800",
  tersedia: "bg-emerald-100 text-emerald-800",
};

export default function LabelStok({ stok }) {
  const status = statusStok(stok);
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${WARNA[status]}`}>
      {status === "habis" ? "Stok habis" : status === "menipis" ? `Menipis: ${stok}` : `Stok ${stok}`}
    </span>
  );
}
