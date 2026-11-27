"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buatSkemaPembayaran } from "@/lib/skema";
import { formatRupiah } from "@/lib/format";
import Tombol from "../Tombol";

const AWAL = { pelanggan: "", metode: "tunai", bayar: "" };

export default function FormPembayaran({ total, nonaktif, onBayar }) {
  const skema = useMemo(() => buatSkemaPembayaran(total), [total]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(skema), defaultValues: AWAL });

  const metode = useWatch({ control, name: "metode" });
  const bayar = Number(useWatch({ control, name: "bayar" })) || 0;

  function kirim(data) {
    onBayar(data);
    reset(AWAL);
  }

  const kelas = (galat) =>
    `w-full rounded-lg border px-3 py-2 ${galat ? "border-red-500" : "border-slate-300"}`;

  return (
    <form
      onSubmit={handleSubmit(kirim)}
      noValidate
      className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
    >
      <div>
        <label htmlFor="pelanggan" className="text-sm font-medium">
          Nama pelanggan (opsional)
        </label>
        <input
          id="pelanggan"
          {...register("pelanggan")}
          className={kelas(errors.pelanggan)}
          aria-invalid={Boolean(errors.pelanggan)}
        />
        {errors.pelanggan && (
          <p className="text-sm text-red-700">{errors.pelanggan.message}</p>
        )}
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Metode pembayaran</legend>
        <div className="mt-1 flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="tunai" {...register("metode")} /> Tunai
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="qris" {...register("metode")} /> QRIS
          </label>
        </div>
      </fieldset>

      {metode === "tunai" && (
        <div>
          <label htmlFor="bayar" className="text-sm font-medium">
            Uang diterima
          </label>
          <input
            id="bayar"
            type="number"
            inputMode="numeric"
            {...register("bayar")}
            className={kelas(errors.bayar)}
            aria-invalid={Boolean(errors.bayar)}
            aria-describedby={errors.bayar ? "bayar-galat" : undefined}
          />
          {errors.bayar && (
            <p id="bayar-galat" className="text-sm text-red-700">
              {errors.bayar.message}
            </p>
          )}
          {bayar >= total && total > 0 && (
            <p className="text-sm text-slate-600">
              Kembalian: <strong>{formatRupiah(bayar - total)}</strong>
            </p>
          )}
        </div>
      )}

      <Tombol type="submit" disabled={nonaktif || isSubmitting}>
        Bayar {formatRupiah(total)}
      </Tombol>
    </form>
  );
}