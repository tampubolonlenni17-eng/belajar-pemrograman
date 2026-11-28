"use client";

import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { keranjangReducer, KERANJANG_AWAL, hitungRingkasan } from "@/lib/keranjang";

const KeranjangContext = createContext(null);

export function KeranjangProvider({ children }) {
  const [state, dispatch] = useReducer(keranjangReducer, KERANJANG_AWAL);

  const ringkasan = useMemo(() => hitungRingkasan(state.item), [state.item]);

  const tambah = useCallback((barang) => dispatch({ type: "tambah", barang }), []);
  const ubahJumlah = useCallback((id, jumlah) => dispatch({ type: "ubahJumlah", id, jumlah }), []);
  const hapus = useCallback((id) => dispatch({ type: "hapus", id }), []);
  const kosongkan = useCallback(() => dispatch({ type: "kosongkan" }), []);

  const nilai = useMemo(
    () => ({ item: state.item, ringkasan, tambah, ubahJumlah, hapus, kosongkan }),
    [state.item, ringkasan, tambah, ubahJumlah, hapus, kosongkan],
  );

  return <KeranjangContext value={nilai}>{children}</KeranjangContext>;
}

export function useKeranjang() {
  const nilai = useContext(KeranjangContext);
  if (!nilai) throw new Error("useKeranjang harus dipakai di dalam <KeranjangProvider>.");
  return nilai;
}
