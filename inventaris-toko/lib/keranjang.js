// lib/keranjang.js — logika keranjang kasir: reducer dan perhitungan (fungsi murni).

export const TINGKAT_DISKON = [
  { minimal: 200000, persen: 15 },
  { minimal: 100000, persen: 10 },
  { minimal: 50000, persen: 5 },
];

export const KERANJANG_AWAL = { item: [] };

export function keranjangReducer(state, aksi) {
  switch (aksi.type) {
    case "tambah": {
      const { barang } = aksi;
      if (barang.stok <= 0) return state;
      const ada = state.item.find((i) => i.id === barang.id);
      if (ada) {
        if (ada.jumlah >= barang.stok) return state;
        return {
          ...state,
          item: state.item.map((i) =>
            i.id === barang.id ? { ...i, jumlah: i.jumlah + 1 } : i
          ),
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
        item: state.item.map((i) =>
          i.id === aksi.id ? { ...i, jumlah: Math.min(jumlah, i.stok) } : i
        ),
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

export function persenDiskon(subtotal) {
  return TINGKAT_DISKON.find((t) => subtotal >= t.minimal)?.persen ?? 0;
}

export function hitungRingkasan(item) {
  const jumlahUnit = item.reduce((t, i) => t + i.jumlah, 0);
  const subtotal = item.reduce((t, i) => t + i.harga * i.jumlah, 0);
  const persen = persenDiskon(subtotal);
  const diskon = Math.round((subtotal * persen) / 100);
  return { jumlahUnit, subtotal, persen, diskon, total: subtotal - diskon };
}

export function kurangiStok(daftar, item) {
  return daftar.map((b) => {
    const dibeli = item.find((i) => i.id === b.id);
    return dibeli ? { ...b, stok: b.stok - dibeli.jumlah } : b;
  });
}

export function menujuDiskonBerikutnya(subtotal) {
  const berikut = [...TINGKAT_DISKON].reverse().find((t) => subtotal < t.minimal);
  return berikut ? { kurang: berikut.minimal - subtotal, persen: berikut.persen } : null;
}