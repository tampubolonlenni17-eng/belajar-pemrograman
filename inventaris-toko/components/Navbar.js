import Link from "next/link";
import { Plus, Store } from "lucide-react";
import Tombol from "./Tombol";

const MENU = [
  { href: "#katalog", label: "Katalog" },
  { href: "#tabel", label: "Tabel" },
  { href: "#tentang", label: "Tentang" },
];

export default function Navbar({ namaToko }) {
  return (
    <header className="sticky top-0 z-10 bg-slate-900 text-white shadow">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4"
        aria-label="Menu utama"
      >
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Store aria-hidden="true" /> {namaToko}
        </Link>
        <ul className="hidden gap-6 text-sm sm:flex">
          {MENU.map((m) => (
            <li key={m.href}>
              <a href={m.href} className="hover:text-teal-300">
                {m.label}
              </a>
            </li>
          ))}
        </ul>
        <Tombol ikon={Plus}>Tambah barang</Tombol>
      </nav>
    </header>
  );
}