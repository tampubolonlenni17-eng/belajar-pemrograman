"use client";
import { useFetch } from "@/hooks/useFetch";

export default function JumlahKategori() {
  const { data, memuat, galat } = useFetch("/data/barang.json");

  if (memuat) return <p>Memuat…</p>;
  if (galat) return <p role="alert">{galat}</p>;

  const hitung = {};
  data.forEach((b) => {
    hitung[b.kategori] = (hitung[b.kategori] ?? 0) + 1;
  });

  return (
    <ul className="mt-6 list-disc pl-6">
      {Object.entries(hitung).map(([k, n]) => (
        <li key={k}>
          {k}: {n} barang
        </li>
      ))}
    </ul>
  );
}
