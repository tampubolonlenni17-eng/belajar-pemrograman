
const kelasLabel = "block text-sm font-semibold text-slate-700";

const kelasInput =
  "w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200";

export default function HalamanDaftar() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <form className="mx-auto max-w-lg space-y-5 rounded-2xl bg-white p-8 shadow-md">

        <h1 className="text-2xl font-bold text-slate-900">
          Formulir Pendaftaran Pelatihan
        </h1>

        <div className="space-y-1">
          <label htmlFor="nama" className={kelasLabel}>
            Nama lengkap
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            placeholder="Contoh: Budi Santoso"
            required
            className={kelasInput}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className={kelasLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={kelasInput}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="lahir" className={kelasLabel}>
            Tanggal lahir
          </label>
          <input
            type="date"
            id="lahir"
            name="lahir"
            className={kelasInput}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="program" className={kelasLabel}>
            Program
          </label>
          <select
            id="program"
            name="program"
            required
            className={kelasInput}
          >
            <option value="">-- Pilih --</option>
            <option value="jp">Junior Programmer</option>
            <option value="jwd">Junior Web Developer</option>
          </select>
        </div>

        <fieldset className="space-y-2">
          <legend className={kelasLabel}>Jenis kelamin</legend>
          <div className="flex gap-6">
            <label htmlFor="lk" className="flex items-center gap-2">
              <input type="radio" id="lk" name="jk" value="L" />
              Laki-laki
            </label>

            <label htmlFor="pr" className="flex items-center gap-2">
              <input type="radio" id="pr" name="jk" value="P" />
              Perempuan
            </label>
          </div>
        </fieldset>

        <div className="space-y-1">
          <label htmlFor="motivasi" className={kelasLabel}>
            Motivasi mengikuti pelatihan
          </label>
          <textarea
            id="motivasi"
            name="motivasi"
            rows={4}
            maxLength={300}
            className={kelasInput}
          ></textarea>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="setuju"
            name="setuju"
            required
          />
          <label htmlFor="setuju" className="text-sm text-slate-700">
            Data yang saya isi benar
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-teal-700 px-4 py-2.5 font-semibold text-white hover:bg-teal-800"
        >
          Daftar
        </button>

      </form>
    </main>
  );
}
