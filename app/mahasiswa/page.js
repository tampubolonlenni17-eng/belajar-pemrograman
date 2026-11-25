import { daftarMahasiswa } from "@/lib/nilai";
import {
  lengkapiNilai,
  statistik,
  peringkat,
  distribusiHuruf,
  filterProdi,
  rataRata,
  ambilKolom,
} from "@/lib/hitung";

export const metadata = { title: "Statistik Nilai Mahasiswa" };

export default function HalamanMahasiswa() {
  const data = lengkapiNilai(daftarMahasiswa);
  const s = statistik(data);
  const tiga = peringkat(data, 3);
  const dist = distribusiHuruf(data);
  const prodi = ["TRPL", "Teknologi Rekayasaya Perangkat Lunak"].map((p) => ({
    nama: p,
    rata: rataRata(ambilKolom(filterProdi(data, p), "akhir")),
  }));

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">Statistik Nilai Mahasiswa</h1>

      <section className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["Mahasiswa", s.jumlahMahasiswa],
          ["Rata-rata", s.rataRata],
          ["Tertinggi", s.tertinggi],
          ["Lulus", `${s.jumlahLulus} (${s.persenLulus}%)`],
        ].map(([label, isi]) => (
          <div key={label} className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-bold">{isi}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div>
          <h2 className="font-semibold">3 Teratas</h2>
          <ol className="mt-2 list-decimal pl-5">
            {tiga.map((m) => (
              <li key={m.nim}>
                {m.nama} — {m.akhir}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-semibold">Distribusi Huruf</h2>
          <ul className="mt-2">
            {Object.entries(dist).map(([huruf, n]) => (
              <li key={huruf}>
                {huruf}: {n} orang
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Rata-rata per Prodi</h2>
          <ul className="mt-2">
            {prodi.map((p) => (
              <li key={p.nama}>
                {p.nama}: {p.rata}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <table className="mt-8 w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">NIM</th>
            <th>Nama</th>
            <th>Prodi</th>
            <th>Akhir</th>
            <th>Huruf</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.nim} className="border-b">
              <td className="py-2">{m.nim}</td>
              <td>{m.nama}</td>
              <td>{m.prodi}</td>
              <td>{m.akhir}</td>
              <td>{m.huruf}</td>
              <td
                className={
                  m.status === "Lulus" ? "text-green-700" : "text-red-700"
                }
              >
                {m.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}