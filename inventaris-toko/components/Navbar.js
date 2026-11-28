import Link from "next/link";
import { Store } from "lucide-react";

const MENU = [
  { href: "/", label: "Barang" },
  { href: "/kasir", label: "Kasir" },
];

export default function Navbar({ namaToko }) {
  return (
    <header className="bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Menu utama">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <Store aria-hidden="true" /> {namaToko}
        </Link>
        <ul className="flex gap-6 text-sm">
          {MENU.map((m) => (
            <li key={m.href}>
              <Link href={m.href} className="hover:text-teal-300">
                {m.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
