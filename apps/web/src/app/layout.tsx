import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './styles.css'; // Ajout des styles CSS standards
import { Web3Provider } from '@/providers/web3-provider';

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
        <Web3Provider>
          <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  );
}