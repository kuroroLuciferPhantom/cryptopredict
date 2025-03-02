import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CryptoPredict - Jeu de prédiction de cryptomonnaies',
  description: 'Collectionnez des cartes, faites des prédictions et gagnez des récompenses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
