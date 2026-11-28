import "./globals.css";

export const metadata = {
  title: "Inventaris Toko",
  description: "Aplikasi inventaris dan kasir toko",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
