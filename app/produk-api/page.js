import dayjs from "dayjs";
import "dayjs/locale/id.js";
import { ambilProduk } from "@/lib/api";
import { formatRupiah } from "@/lib/format";

dayjs.locale("id");

export const metadata = { title: "Produk dari API" };

const KURS = 16000; // harga DummyJSON dalam dolar, dikonversi kasar ke Rupiah

export default async function HalamanProdukApi({ searchParams }) {
  const { q = "" } = await searchParams;
  const { data, total, error } = await ambilProduk(q);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">Produk dari API</h1>

      <form className="mt-4 flex gap-2" action="/produk-api">
        <label htmlFor="q" className="sr-only">Cari produk</label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="Cari, misalnya phone"
          className="flex-1 rounded-lg border px-3 py-2"
        />
        <button className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white">
          Cari
        </button>
      </form>

      {error ? (
        <div role="alert" className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          <p className="font-semibold">Gagal memuat produk.</p>
          <p className="text-sm">{error}. Periksa koneksi internet lalu muat ulang halaman.</p>
        </div>
      ) : data.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed p-6 text-center text-slate-600">
          Tidak ada produk yang cocok dengan &quot;{q}&quot;.
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm text-slate-600">
            Menampilkan {data.length} dari {total} produk{q && ` untuk "${q}"`}.
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => (
              <li key={p.id} className="flex flex-col rounded-xl border p-4">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  loading="lazy"
                  className="h-40 w-full rounded-lg bg-slate-100 object-contain"
                />
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-teal-700">
                  {p.category}
                </p>
                <h2 className="mt-1 font-semibold leading-snug">{p.title}</h2>
                <p
                  className="mt-1 text-sm leading-relaxed text-slate-600"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.description}
                </p>
                <div className="mt-auto border-t pt-3">
                  <p className="text-lg font-bold">{formatRupiah(p.price * KURS)}</p>
                  <p className={p.stock < 10 ? "text-sm text-red-700" : "text-sm text-slate-600"}>
                    Stok {p.stock}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="mt-8 text-xs text-slate-500">
        Diperbarui {dayjs().format("dddd, D MMMM YYYY HH:mm")}
      </p>
    </main>
  );
}       