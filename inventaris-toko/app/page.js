import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HalamanBarang from "@/components/HalamanBarang";
import JumlahKategori from "@/components/JumlahKategori";

const NAMA_TOKO = "Toko Maju Jaya";

export default function Beranda() {
  return (
    <>
      <Navbar namaToko={NAMA_TOKO} />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold">Manajemen Barang</h1>
        <HalamanBarang />
        <JumlahKategori />
      </main>
      <Footer namaToko={NAMA_TOKO} />
    </>
  );
}