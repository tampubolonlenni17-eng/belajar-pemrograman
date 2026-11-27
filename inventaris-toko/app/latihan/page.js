"use client";

import FormPembayaran from "@/components/kasir/FormPembayaran";

export default function UjiForm() {
  return (
    <main className="mx-auto max-w-md p-6">
      <FormPembayaran total={58500} nonaktif={false} onBayar={(d) => console.log("bayar", d)} />
    </main>
  );
}