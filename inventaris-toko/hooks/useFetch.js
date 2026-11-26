"use client";
import { useEffect, useState } from "react";

/**
 * Mengambil JSON dari url. Mengembalikan { data, memuat, galat, muatUlang }.
 * Permintaan lama dibatalkan saat url berubah atau komponen dilepas.
 */
export function useFetch(url) {
  const [hasil, setHasil] = useState({ data: null, memuat: true, galat: null });
  const [percobaan, setPercobaan] = useState(0);

  useEffect(() => {
    const pengendali = new AbortController();

    async function ambil() {
      try {
        const res = await fetch(url, { signal: pengendali.signal });
        if (!res.ok) throw new Error(`Server menjawab ${res.status}`);
        const data = await res.json();
        setHasil({ data, memuat: false, galat: null });
      } catch (err) {
        if (err.name === "AbortError") return; // dibatalkan, abaikan
        setHasil({ data: null, memuat: false, galat: err.message });
      }
    }

    ambil();
    return () => pengendali.abort(); // cleanup
  }, [url, percobaan]);

  function muatUlang() {
    setHasil({ data: null, memuat: true, galat: null });
    setPercobaan((n) => n + 1);
  }

  return { ...hasil, muatUlang };
}