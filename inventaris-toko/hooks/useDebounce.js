"use client";
import { useEffect, useState } from "react";

/** Mengembalikan nilai yang baru diperbarui setelah `jeda` ms tanpa perubahan. */
export function useDebounce(nilai, jeda = 300) {
  const [nilaiTunda, setNilaiTunda] = useState(nilai);

  useEffect(() => {
    const id = setTimeout(() => setNilaiTunda(nilai), jeda);
    return () => clearTimeout(id); // ketikan baru membatalkan timer lama
  }, [nilai, jeda]);

  return nilaiTunda;
}
