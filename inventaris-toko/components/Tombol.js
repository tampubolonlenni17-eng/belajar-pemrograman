const GAYA = {
  utama: "bg-teal-700 text-white hover:bg-teal-800",
  garis: "border border-teal-700 text-teal-700 hover:bg-teal-50",
  bahaya: "bg-red-600 text-white hover:bg-red-700",
  netral: "bg-slate-200 text-slate-800 hover:bg-slate-300",
};

export default function Tombol({
  children,
  varian = "utama",
  ikon: Ikon,
  ...sisa
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${GAYA[varian]}`}
      {...sisa}
    >
      {Ikon && <Ikon size={16} aria-hidden="true" />}
      {children}
    </button>
  );
}