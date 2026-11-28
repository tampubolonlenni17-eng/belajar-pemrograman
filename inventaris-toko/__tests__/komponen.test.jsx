import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LabelStok from "@/components/LabelStok";
import Paginasi from "@/components/Paginasi";
import { KeranjangProvider } from "@/context/KeranjangContext";
import PilihBarang from "@/components/kasir/PilihBarang";
import Keranjang from "@/components/kasir/Keranjang";
import RingkasanBelanja from "@/components/kasir/RingkasanBelanja";
import FormPembayaran from "@/components/kasir/FormPembayaran";
import { daftarBarang } from "@/lib/data-barang";

describe("LabelStok", () => {
  it.each([
    [0, "Stok habis"],
    [3, "Menipis: 3"],
    [48, "Stok 48"],
  ])('stok %i menampilkan "%s"', (stok, teks) => {
    render(<LabelStok stok={stok} />);
    expect(screen.getByText(teks)).toBeInTheDocument();
  });
});

describe("Paginasi", () => {
  it("tidak tampil jika hanya 1 halaman", () => {
    const { container } = render(<Paginasi halaman={1} totalHalaman={1} onPindah={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("menandai halaman aktif dan menonaktifkan Sebelumnya di halaman 1", () => {
    render(<Paginasi halaman={1} totalHalaman={3} onPindah={() => {}} />);
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: /Sebelumnya/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Berikutnya/ })).toBeEnabled();
  });

  it("memanggil onPindah dengan nomor halaman yang diklik", async () => {
    const onPindah = vi.fn();
    render(<Paginasi halaman={2} totalHalaman={3} onPindah={onPindah} />);
    await userEvent.click(screen.getByRole("button", { name: "3" }));
    await userEvent.click(screen.getByRole("button", { name: /Sebelumnya/ }));
    expect(onPindah.mock.calls).toEqual([[3], [1]]);
  });
});

/** Render bagian kasir di dalam Provider, seperti di halaman sebenarnya. */
function renderKasir() {
  return render(
    <KeranjangProvider>
      <PilihBarang daftar={daftarBarang} />
      <Keranjang />
      <RingkasanBelanja />
    </KeranjangProvider>,
  );
}

describe("Kasir: keranjang dan diskon", () => {
  it("keranjang awal kosong dan tombol Pensil 2B (stok 0) nonaktif", () => {
    renderKasir();
    expect(screen.getByText("Keranjang masih kosong.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tambah Pensil 2B ke keranjang" })).toBeDisabled();
  });

  it("menambah barang memperbarui total dan info diskon berikutnya", async () => {
    const user = userEvent.setup();
    renderKasir();
    const tambahSabun = screen.getByRole("button", { name: "Tambah Sabun Cuci Piring ke keranjang" });
    await user.click(tambahSabun);
    await user.click(tambahSabun);
    expect(document.querySelector("[data-uji=total]")).toHaveTextContent("Rp 30.000");
    expect(screen.getByText(/lagi untuk diskon 5%/)).toHaveTextContent("Rp 20.000");
  });

  it("mengetik jumlah 14 sabun + 2 air memberi diskon 15% dan total Rp 185.300", async () => {
    const user = userEvent.setup();
    renderKasir();
    await user.click(screen.getByRole("button", { name: "Tambah Sabun Cuci Piring ke keranjang" }));
    await user.click(screen.getByRole("button", { name: "Tambah Air Mineral 600 ml ke keranjang" }));
    const jumlahSabun = screen.getByRole("spinbutton", { name: "Jumlah Sabun Cuci Piring" });
    await user.clear(jumlahSabun);
    await user.type(jumlahSabun, "14");
    await user.click(screen.getByRole("button", { name: "Tambah Air Mineral 600 ml" }));
    expect(screen.getByText("Diskon 15%")).toBeInTheDocument();
    expect(document.querySelector("[data-uji=total]")).toHaveTextContent("Rp 185.300");
  });

  it("tombol tambah nonaktif setelah jumlah mencapai stok (Pasta Gigi, stok 3)", async () => {
    const user = userEvent.setup();
    renderKasir();
    const tombol = screen.getByRole("button", { name: "Tambah Pasta Gigi ke keranjang" });
    for (let i = 0; i < 3; i++) await user.click(tombol);
    expect(tombol).toBeDisabled();
    expect(screen.getByRole("spinbutton", { name: "Jumlah Pasta Gigi" })).toHaveValue(3);
  });

  it("menghapus barang dari keranjang", async () => {
    const user = userEvent.setup();
    renderKasir();
    await user.click(screen.getByRole("button", { name: "Tambah Teh Botol ke keranjang" }));
    await user.click(screen.getByRole("button", { name: "Hapus Teh Botol dari keranjang" }));
    expect(screen.getByText("Keranjang masih kosong.")).toBeInTheDocument();
  });
});

describe("FormPembayaran (React Hook Form + Zod)", () => {
  it("menolak uang kurang dan tidak memanggil onBayar", async () => {
    const user = userEvent.setup();
    const onBayar = vi.fn();
    render(<FormPembayaran total={58500} nonaktif={false} onBayar={onBayar} />);
    await user.type(screen.getByLabelText("Uang diterima"), "50000");
    await user.click(screen.getByRole("button", { name: /Bayar/ }));
    expect(await screen.findByText("Uang yang dibayar kurang dari total.")).toBeInTheDocument();
    expect(screen.getByLabelText("Uang diterima")).toHaveAttribute("aria-invalid", "true");
    expect(onBayar).not.toHaveBeenCalled();
  });

  it("menampilkan kembalian dan mengirim data bertipe angka", async () => {
    const user = userEvent.setup();
    const onBayar = vi.fn();
    render(<FormPembayaran total={58500} nonaktif={false} onBayar={onBayar} />);
    await user.type(screen.getByLabelText("Nama pelanggan (opsional)"), " Budi ");
    await user.type(screen.getByLabelText("Uang diterima"), "60000");
    expect(screen.getByText(/Kembalian/)).toHaveTextContent("Rp 1.500");
    await user.click(screen.getByRole("button", { name: /Bayar/ }));
    expect(onBayar).toHaveBeenCalledWith({ pelanggan: "Budi", metode: "tunai", bayar: 60000 });
  });

  it("QRIS menyembunyikan kolom uang", async () => {
    const user = userEvent.setup();
    render(<FormPembayaran total={58500} nonaktif={false} onBayar={() => {}} />);
    await user.click(screen.getByLabelText("QRIS"));
    expect(screen.queryByLabelText("Uang diterima")).not.toBeInTheDocument();
  });

  it("tombol Bayar nonaktif saat keranjang kosong", () => {
    render(<FormPembayaran total={0} nonaktif onBayar={() => {}} />);
    expect(screen.getByRole("button", { name: /Bayar/ })).toBeDisabled();
  });
});

describe("Regresi: mengosongkan kolom jumlah", () => {
  it("menghapus angka di kolom jumlah tidak menghapus baris keranjang", async () => {
    const user = userEvent.setup();
    renderKasir();
    await user.click(screen.getByRole("button", { name: "Tambah Sabun Cuci Piring ke keranjang" }));
    const jumlah = screen.getByRole("spinbutton", { name: "Jumlah Sabun Cuci Piring" });
    await user.clear(jumlah);
    expect(screen.getByRole("spinbutton", { name: "Jumlah Sabun Cuci Piring" })).toHaveValue(null);
    await user.type(jumlah, "4");
    expect(jumlah).toHaveValue(4);
    expect(document.querySelector("[data-uji=total]")).toHaveTextContent("Rp 57.000");
  });
});
