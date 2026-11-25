import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ManajemenBarang from "@/components/ManajemenBarang";
import { daftarBarang } from "@/lib/data-barang";

const NAMA_TOKO = "Toko Maju Jaya";

export default function Beranda() {
  return (
    <>
      <Navbar namaToko={NAMA_TOKO} />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold">Manajemen Barang</h1>
        <ManajemenBarang barangAwal={daftarBarang} />
      </main>
      <Footer namaToko={NAMA_TOKO} />
    </>
  );
}