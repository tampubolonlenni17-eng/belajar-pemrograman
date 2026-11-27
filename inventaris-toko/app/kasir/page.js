import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HalamanKasir from "@/components/kasir/HalamanKasir";

const NAMA_TOKO = "Toko Maju Jaya";

export const metadata = { title: "Kasir · Inventaris Toko" };

export default function HalamanKasirPage() {
  return (
    <>
      <Navbar namaToko={NAMA_TOKO} />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold">Kasir</h1>
        <HalamanKasir />
      </main>
      <Footer namaToko={NAMA_TOKO} />
    </>
  );
}