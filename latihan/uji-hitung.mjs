import { daftarMahasiswa } from "../lib/nilai.js";
import * as H from "../lib/hitung.js";

const data = H.lengkapiNilai(daftarMahasiswa);
console.log(H.statistik(data));
console.log(H.peringkat(data, 3).map((m) => `${m.nama} ${m.akhir}`));
console.log(H.distribusiHuruf(data));
console.log(H.cariNim(data, "2401008")?.akhir, H.cariNim(data, "9999"));