import Penghitung from "@/components/Penghitung";

export default function Latihan() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <Penghitung />
      <Penghitung awal={10} langkah={5} />
    </main>
  );
}