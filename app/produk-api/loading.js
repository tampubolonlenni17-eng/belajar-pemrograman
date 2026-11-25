export default function Memuat() {
  return (
    <main className="mx-auto max-w-5xl p-6" aria-busy="true">
      <h1 className="text-2xl font-bold">Produk dari API</h1>
      <p className="mt-4 text-slate-600">Memuat produk…</p>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <li key={n} className="h-32 animate-pulse rounded-xl bg-slate-200" />
        ))}
      </ul>
    </main>
  );
}