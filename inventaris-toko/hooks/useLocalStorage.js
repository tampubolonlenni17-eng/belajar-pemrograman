"use client";
import { useEffect, useState } from "react";

/**
 * Seperti useState, tetapi nilainya disimpan di localStorage.
 * Hanya untuk komponen yang dirender di browser (bukan saat render server).
 */
export function useLocalStorage(kunci, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const tersimpan = window.localStorage.getItem(kunci);
      return tersimpan !== null ? JSON.parse(tersimpan) : nilaiAwal;
    } catch {
      return nilaiAwal;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(kunci, JSON.stringify(nilai));
  }, [kunci, nilai]);

  return [nilai, setNilai];
}