"use client";
import Penghitung from "@/components/Penghitung";
import FormBarang from "@/components/FormBarang";
import { daftarBarang } from "@/lib/data-barang";

export default function Latihan() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Penghitung />
      <Penghitung awal={10} langkah={5} />
      <FormBarang daftar={daftarBarang} onSimpan={(x) => alert(JSON.stringify(x))} />
    </main>
  );
}