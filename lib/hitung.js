import { BOBOT } from "./nilai.js";

// 1. Rata-rata berbobot, dibulatkan 2 desimal
export const nilaiAkhir = ({ tugas, uts, uas }, bobot = BOBOT) =>
  Math.round(
    (tugas * bobot.tugas + uts * bobot.uts + uas * bobot.uas) * 100
  ) / 100;

// 2. Angka jadi huruf mutu
export function hurufMutu(angka) {
  if (angka >= 85) return "A";
  if (angka >= 75) return "B";
  if (angka >= 65) return "C";
  if (angka >= 50) return "D";
  return "E";
}

// 3. Lulus atau tidak
export const lulus = (angka, batas = 65) => angka >= batas;

// 4. Tambah properti akhir, huruf, status (array baru)
export const lengkapiNilai = (daftar) =>
  daftar.map((m) => {
    const akhir = nilaiAkhir(m);
    return {
      ...m,
      akhir,
      huruf: hurufMutu(akhir),
      status: lulus(akhir) ? "Lulus" : "Tidak lulus",
    };
  });

// 5. Jumlah isi array angka
export const jumlah = (angka) => angka.reduce((total, n) => total + n, 0);

// 6. Rata-rata (0 untuk array kosong)
export const rataRata = (angka) =>
  angka.length === 0
    ? 0
    : Math.round((jumlah(angka) / angka.length) * 100) / 100;

// 7. Nilai maksimum dan minimum
export const tertinggi = (angka) => Math.max(...angka);
export const terendah = (angka) => Math.min(...angka);

// 8. Ambil satu kolom jadi array
export const ambilKolom = (daftar, kolom) => daftar.map((m) => m[kolom]);

// 9. Cari mahasiswa berdasarkan NIM
export const cariNim = (daftar, nim) => daftar.find((m) => m.nim === nim);

// 10. Filter satu prodi
export const filterProdi = (daftar, prodi) =>
  daftar.filter((m) => m.prodi === prodi);

// 11. Urutkan tanpa mengubah array asli
export const urutkan = (daftar, kolom, arah = "turun") =>
  [...daftar].sort((a, b) =>
    arah === "naik" ? a[kolom] - b[kolom] : b[kolom] - a[kolom]
  );

// 12. N teratas menurut nilai akhir
export const peringkat = (daftar, n = 3) =>
  urutkan(daftar, "akhir").slice(0, n);

// 13. Jumlah mahasiswa per huruf
export const distribusiHuruf = (daftar) =>
  daftar.reduce(
    (hasil, m) => {
      hasil[m.huruf] = (hasil[m.huruf] ?? 0) + 1;
      return hasil;
    },
    { A: 0, B: 0, C: 0, D: 0, E: 0 }
  );

// 14. Ringkasan statistik
export function statistik(daftar) {
  const akhir = ambilKolom(daftar, "akhir");
  const jumlahLulus = daftar.filter((m) => m.status === "Lulus").length;
  return {
    jumlahMahasiswa: daftar.length,
    rataRata: rataRata(akhir),
    tertinggi: tertinggi(akhir),
    terendah: terendah(akhir),
    jumlahLulus,
    persenLulus: Math.round((jumlahLulus / daftar.length) * 100),
  };
}