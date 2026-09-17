import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'StockAI — Global Stock Research, Screening & AI Intelligence',
  description:
    'Global stock research, multi-market screening (IDX, US, Global), trading education, portfolio management, and evidence-based AI scenario analysis.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen bg-[#070b12] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pb-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
