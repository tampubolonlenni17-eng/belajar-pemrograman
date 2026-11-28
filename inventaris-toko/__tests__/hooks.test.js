import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useDebounce", () => {
  afterEach(() => vi.useRealTimers());

  it("baru memperbarui nilai setelah jeda tanpa perubahan", () => {
    vi.useFakeTimers(); // waktu palsu: kita yang memajukan jam
    const { result, rerender } = renderHook(({ nilai }) => useDebounce(nilai, 300), {
      initialProps: { nilai: "s" },
    });
    rerender({ nilai: "sa" });
    rerender({ nilai: "sab" });
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe("s"); // belum 300 ms sejak ketikan terakhir
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe("sab");
  });
});

describe("useLocalStorage", () => {
  afterEach(() => window.localStorage.clear());

  it("memakai nilai awal lalu menyimpan perubahan sebagai JSON", () => {
    const { result } = renderHook(() => useLocalStorage("uji:angka", [1, 2]));
    expect(result.current[0]).toEqual([1, 2]);
    act(() => result.current[1]([1, 2, 3]));
    expect(JSON.parse(window.localStorage.getItem("uji:angka"))).toEqual([1, 2, 3]);
  });

  it("membaca nilai yang sudah tersimpan", () => {
    window.localStorage.setItem("uji:nama", JSON.stringify("Budi"));
    const { result } = renderHook(() => useLocalStorage("uji:nama", "awal"));
    expect(result.current[0]).toBe("Budi");
  });

  it("JSON rusak di localStorage → kembali ke nilai awal", () => {
    window.localStorage.setItem("uji:rusak", "{bukan json");
    const { result } = renderHook(() => useLocalStorage("uji:rusak", 0));
    expect(result.current[0]).toBe(0);
  });
});
