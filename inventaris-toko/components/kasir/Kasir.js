"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useKeranjang } from "@/context/KeranjangContext";
import { kurangiStok } from "@/lib/keranjang";
import PilihBarang from "./PilihBarang";
import Keranjang from "./Keranjang";
import RingkasanBelanja from "./RingkasanBelanja";
import FormPembayaran from "./FormPembayaran";
import Struk from "./Struk";

export default function Kasir({ barangAwal }) {
  // Kunci sama dengan halaman Barang, supaya stok yang terjual ikut berkurang di sana
  const [daftar, setDaftar] = useLocalStorage("inventaris:barang", barangAwal);
  const [struk, setStruk] = useState(null);
  const { item, ringkasan, kosongkan } = useKeranjang();

  function bayar(isian) {
    setDaftar((lama) => kurangiStok(lama, item));
    setStruk({
      nomor: `TRX-${Date.now().toString().slice(-6)}`,
      waktu: new Date().toLocaleString("id-ID"),
      pelanggan: isian.pelanggan || "Umum",
      metode: isian.metode,
      item,
      ...ringkasan,
      bayar: isian.metode === "tunai" ? isian.bayar : ringkasan.total,
      kembalian: isian.metode === "tunai" ? isian.bayar - ringkasan.total : 0,
    });
    kosongkan();
  }

  if (struk) return <Struk data={struk} onSelesai={() => setStruk(null)} />;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <section className="lg:col-span-3" aria-labelledby="judul-pilih">
        <h2 id="judul-pilih" className="mb-3 text-lg font-bold">
          Pilih barang
        </h2>
        <PilihBarang daftar={daftar} />
      </section>
      <section className="space-y-4 lg:col-span-2" aria-labelledby="judul-keranjang">
        <h2 id="judul-keranjang" className="text-lg font-bold">
          Keranjang ({ringkasan.jumlahUnit})
        </h2>
        <Keranjang />
        <RingkasanBelanja />
        <FormPembayaran
          total={ringkasan.total}
          nonaktif={item.length === 0}
          onBayar={bayar}
        />
      </section>
    </div>
  );
}