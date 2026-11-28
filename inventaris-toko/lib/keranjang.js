// lib/keranjang.js — logika keranjang kasir: reducer dan perhitungan (fungsi murni).

/** Diskon bertingkat berdasarkan subtotal. Urut dari ambang terbesar. */
export const TINGKAT_DISKON = [
  { minimal: 200000, persen: 15 },
  { minimal: 100000, persen: 10 },
  { minimal: 50000, persen: 5 },
];

/**
 * @typedef {object} ItemKeranjang
 * @property {number} id
 * @property {string} kode
 * @property {string} nama
 * @property {number} harga Harga satuan
 * @property {number} stok Stok saat barang dimasukkan (batas jumlah)
 * @property {string} satuan
 * @property {number} jumlah Jumlah dibeli (1..stok)
 */

/** State awal keranjang: belum ada item. */
export const KERANJANG_AWAL = { item: [] };

/**
 * Reducer keranjang. Setiap aksi mengembalikan state baru (tidak mengubah state lama).
 * @param {{item: ItemKeranjang[]}} state Keranjang saat ini
 * @param {{type:"tambah", barang:object} | {type:"ubahJumlah", id:number, jumlah:number|string} | {type:"hapus", id:number} | {type:"kosongkan"}} aksi Aksi yang dikirim lewat dispatch
 * @returns {{item: ItemKeranjang[]}} Keranjang baru
 * @throws {Error} Jika type aksi tidak dikenal
 */
export function keranjangReducer(state, aksi) {
  switch (aksi.type) {
    case "tambah": {
      const { barang } = aksi;
      if (barang.stok <= 0) return state; // stok habis: abaikan
      const ada = state.item.find((i) => i.id === barang.id);
      if (ada) {
        if (ada.jumlah >= barang.stok) return state; // sudah mencapai stok
        return {
          ...state,
          item: state.item.map((i) => (i.id === barang.id ? { ...i, jumlah: i.jumlah + 1 } : i)),
        };
      }
      const { id, kode, nama, harga, stok, satuan } = barang;
      return {
        ...state,
        item: [...state.item, { id, kode, nama, harga, stok, satuan, jumlah: 1 }],
      };
    }
    case "ubahJumlah": {
      const jumlah = Math.floor(Number(aksi.jumlah));
      if (!Number.isFinite(jumlah) || jumlah <= 0) {
        return { ...state, item: state.item.filter((i) => i.id !== aksi.id) };
      }
      return {
        ...state,
        item: state.item.map((i) => (i.id === aksi.id ? { ...i, jumlah: Math.min(jumlah, i.stok) } : i)),
      };
    }
    case "hapus":
      return { ...state, item: state.item.filter((i) => i.id !== aksi.id) };
    case "kosongkan":
      return KERANJANG_AWAL;
    default:
      throw new Error(`Aksi tidak dikenal: ${aksi.type}`);
  }
}

/**
 * Persen diskon bertingkat untuk subtotal tertentu.
 * @param {number} subtotal Total sebelum diskon
 * @returns {number} 0, 5, 10, atau 15
 * @example persenDiskon(100000); // 10
 */
export function persenDiskon(subtotal) {
  return TINGKAT_DISKON.find((t) => subtotal >= t.minimal)?.persen ?? 0;
}

/**
 * Ringkasan belanja; diskon dibulatkan ke rupiah terdekat.
 * @param {ItemKeranjang[]} item Isi keranjang
 * @returns {{jumlahUnit:number, subtotal:number, persen:number, diskon:number, total:number}} Ringkasan
 */
export function hitungRingkasan(item) {
  const jumlahUnit = item.reduce((t, i) => t + i.jumlah, 0);
  const subtotal = item.reduce((t, i) => t + i.harga * i.jumlah, 0);
  const persen = persenDiskon(subtotal);
  const diskon = Math.round((subtotal * persen) / 100);
  return { jumlahUnit, subtotal, persen, diskon, total: subtotal - diskon };
}

/**
 * Kurangi stok barang sesuai isi keranjang.
 * @param {import("./data-barang.js").Barang[]} daftar Daftar barang (tidak diubah)
 * @param {ItemKeranjang[]} item Isi keranjang yang dibayar
 * @returns {import("./data-barang.js").Barang[]} Array baru dengan stok berkurang
 */
export function kurangiStok(daftar, item) {
  return daftar.map((b) => {
    const dibeli = item.find((i) => i.id === b.id);
    return dibeli ? { ...b, stok: b.stok - dibeli.jumlah } : b;
  });
}

/**
 * Berapa lagi belanja untuk naik ke tingkat diskon berikutnya.
 * @param {number} subtotal Total sebelum diskon
 * @returns {{kurang:number, persen:number} | null} null jika sudah di tingkat tertinggi
 */
export function menujuDiskonBerikutnya(subtotal) {
  const berikut = [...TINGKAT_DISKON].reverse().find((t) => subtotal < t.minimal);
  return berikut ? { kurang: berikut.minimal - subtotal, persen: berikut.persen } : null;
}
