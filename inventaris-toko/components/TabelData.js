export default function TabelData({ kolom, data, kunciBaris = "id", pesanKosong = "Tidak ada data." }) {
  if (data.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">{pesanKosong}</p>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100">
          <tr>
            {kolom.map((k) => (
              <th key={k.kunci} scope="col" className={`px-4 py-3 ${k.rataKanan ? "text-right" : ""}`}>
                {k.judul}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((baris) => (
            <tr key={baris[kunciBaris]} className="border-t border-slate-200">
              {kolom.map((k) => (
                <td key={k.kunci} className={`px-4 py-3 ${k.rataKanan ? "text-right" : ""}`}>
                  {k.tampil ? k.tampil(baris) : baris[k.kunci]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
