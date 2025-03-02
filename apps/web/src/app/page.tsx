import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation temporaire */}
      <header className="navbar">
        <div className="text-xl font-bold">CryptoPredict</div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-blue-400">Accueil</Link></li>
            <li><Link href="/game" className="hover:text-blue-400">Jouer</Link></li>
            <li><Link href="/marketplace" className="hover:text-blue-400">Marketplace</Link></li>
            <li><Link href="/profile" className="hover:text-blue-400">Profil</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Bienvenue sur CryptoPredict</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Collectionnez des cartes, prédisez l'évolution des prix et gagnez des récompenses!
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/game" className="btn-primary">Commencer à jouer</Link>
          <Link href="/about" className="btn-secondary">En savoir plus</Link>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Collection de cartes</h3>
              <p>Collectionnez des cartes représentant différentes cryptomonnaies, chacune avec ses propres attributs et raretés.</p>
            </div>
            
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Prédictions de prix</h3>
              <p>Utilisez vos connaissances et vos cartes pour prédire l'évolution des prix et gagnez des récompenses.</p>
            </div>
            
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Modes de jeu variés</h3>
              <p>Jouez dans différents modes: Classique, Stabilité ou Meme Coins, chacun avec ses propres règles et récompenses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rarités des cartes */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Découvrez les différentes raretés</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card card-common glow-common p-4 text-center hover:scale-105">
              <h3 className="text-gray-300">Commune</h3>
            </div>
            
            <div className="card card-rare glow-rare p-4 text-center hover:scale-105">
              <h3 className="text-blue-400">Rare</h3>
            </div>
            
            <div className="card card-epic glow-epic p-4 text-center hover:scale-105">
              <h3 className="text-purple-400">Épique</h3>
            </div>
            
            <div className="card card-legendary glow-legendary p-4 text-center hover:scale-105">
              <h3 className="text-orange-400">Légendaire</h3>
            </div>
            
            <div className="card card-mythic glow-mythic p-4 text-center hover:scale-105">
              <h3 className="text-red-400">Mythique</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">&copy; 2025 CryptoPredict - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}
