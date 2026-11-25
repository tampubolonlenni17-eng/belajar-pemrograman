export default function Bagian({ id, judul, keterangan, children }) {
  return (
    <section id={id} className="mt-10 scroll-mt-20">
      <h2 className="text-xl font-bold">{judul}</h2>
      {keterangan && <p className="text-sm text-slate-600">{keterangan}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}