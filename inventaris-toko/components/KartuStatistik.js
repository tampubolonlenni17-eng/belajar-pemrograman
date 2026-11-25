export default function KartuStatistik({
  label,
  nilai,
  ikon: Ikon,
  peringatan = false,
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border bg-white p-4 ${
        peringatan ? "border-amber-400" : "border-slate-200"
      }`}
    >
      {Ikon && (
        <Ikon
          className={peringatan ? "text-amber-600" : "text-teal-700"}
          aria-hidden="true"
        />
      )}
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-xl font-bold">{nilai}</p>
      </div>
    </div>
  );
}