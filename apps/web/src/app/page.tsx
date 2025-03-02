import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BarChart2, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Logo */}
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                CryptoPredict
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/game" className="text-slate-300 hover:text-white transition-colors">
                Jouer
              </Link>
              <Link href="/marketplace" className="text-slate-300 hover:text-white transition-colors">
                Marketplace
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                À propos
              </Link>
            </nav>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/login" className="px-4 py-2 rounded-md text-white hover:bg-slate-700 transition-colors">
                Connexion
              </Link>
              <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              <span className="block">Prédisez. Collectionnez.</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Gagnez.</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              CryptoPredict est un jeu stratégique où vous collectionnez des cartes, prédisez l'évolution des prix des cryptomonnaies et gagnez des récompenses. Saurez-vous maîtriser le marché?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 text-center flex items-center justify-center">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/game" className="px-6 py-3 border border-slate-600 rounded-md text-white hover:bg-slate-800 transition-colors text-center">
                Découvrir le jeu
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-80 md:h-96 relative z-0 perspective-1000 hidden md:block">
              {/* Carte BTC */}
              <div className="absolute top-8 right-20 w-64 h-96 card card-legendary glow-legendary transform rotate-12 transition-all duration-700 hover:rotate-0 hover:scale-105 hover:z-10">
                <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-4 flex flex-col">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-md text-sm">Légendaire</span>
                    <span className="font-bold text-white">BTC</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">₿</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Bitcoin</h3>
                    <div className="text-orange-400 mt-2 text-sm">Satoshi Nakamoto</div>
                  </div>
                  <div className="border-t border-slate-700 pt-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-slate-400">Puissance: <span className="text-white">95</span></div>
                      <div className="text-slate-400">Volatilité: <span className="text-white">8.5</span></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Carte ETH */}
              <div className="absolute top-12 left-20 w-64 h-96 card card-epic glow-epic transform -rotate-6 transition-all duration-700 hover:rotate-0 hover:scale-105 hover:z-10">
                <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-4 flex flex-col">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md text-sm">Épique</span>
                    <span className="font-bold text-white">ETH</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">Ξ</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Ethereum</h3>
                    <div className="text-purple-400 mt-2 text-sm">Vitalik Buterin</div>
                  </div>
                  <div className="border-t border-slate-700 pt-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-slate-400">Puissance: <span className="text-white">88</span></div>
                      <div className="text-slate-400">Volatilité: <span className="text-white">7.2</span></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Carte SOL (plus petite, en arrière-plan) */}
              <div className="absolute top-24 left-10 w-56 h-84 card card-rare glow-rare transform -rotate-12 scale-90 transition-all duration-700 hover:rotate-0 hover:scale-100 hover:z-10">
                <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-4 flex flex-col">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md text-sm">Rare</span>
                    <span className="font-bold text-white">SOL</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-400 rounded-full mb-4 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">S</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">Solana</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Comment ça marche</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600 shadow-xl transition-transform hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="text-white h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prédisez</h3>
              <p className="text-slate-300">
                Utilisez vos connaissances en cryptomonnaies pour prédire les mouvements de prix à court terme et gagner des points.
              </p>
            </div>
            
            <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600 shadow-xl transition-transform hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <BarChart2 className="text-white h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collectionnez</h3>
              <p className="text-slate-300">
                Améliorez vos chances de succès en collectionnant des cartes de différentes raretés avec des bonus uniques.
              </p>
            </div>
            
            <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600 shadow-xl transition-transform hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-orange-500 to-pink-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-white h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compétitionnez</h3>
              <p className="text-slate-300">
                Grimpez dans le classement, remportez des ligues et prouvez que vous êtes le meilleur prédicteur de crypto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modes de jeu Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Modes de jeu</h2>
          <p className="text-center text-slate-300 mb-16 max-w-3xl mx-auto">
            CryptoPredict propose plusieurs modes de jeu adaptés à différents styles et stratégies.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-6 rounded-xl border border-blue-700/30 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Mode Classique</h3>
              <p className="text-slate-300 mb-6">
                Prédisez les mouvements de prix des principales cryptomonnaies. Parfait pour les débutants et les experts.
              </p>
              <div className="text-sm text-blue-300 font-medium">
                &gt; Ligues Bronze à Diamant
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-900/50 to-green-800/50 p-6 rounded-xl border border-green-700/30 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-teal-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              <h3 className="text-xl font-semibold mb-3 text-green-300">Mode Stabilité</h3>
              <p className="text-slate-300 mb-6">
                Identifiez les cryptos qui resteront les plus stables. Récompense la connaissance approfondie du marché.
              </p>
              <div className="text-sm text-green-300 font-medium">
                &gt; Bonus de précision x1.5
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900/50 to-orange-800/50 p-6 rounded-xl border border-orange-700/30 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-yellow-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-300">Mode Meme Coins</h3>
              <p className="text-slate-300 mb-6">
                Prédisez les mouvements volatils des meme coins. Risqué, mais avec des récompenses potentiellement énormes.
              </p>
              <div className="text-sm text-yellow-300 font-medium">
                &gt; Gains jusqu'à x3
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rarety Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Découvrez les différentes raretés
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="card card-common p-6 w-48 text-center bg-slate-800/50 shadow-xl transition-transform hover:scale-105">
              <div className="text-gray-300 font-semibold mb-2">COMMUNE</div>
              <div className="h-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mb-3"></div>
              <div className="text-sm text-slate-400 mb-4">Bonus de base</div>
              <div className="text-xs text-slate-500">80% des cartes</div>
            </div>
            
            <div className="card card-rare p-6 w-48 text-center bg-slate-800/50 shadow-xl transition-transform hover:scale-105">
              <div className="text-blue-400 font-semibold mb-2">RARE</div>
              <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mb-3"></div>
              <div className="text-sm text-slate-400 mb-4">+10% Précision</div>
              <div className="text-xs text-slate-500">15% des cartes</div>
            </div>
            
            <div className="card card-epic p-6 w-48 text-center bg-slate-800/50 shadow-xl transition-transform hover:scale-105">
              <div className="text-purple-400 font-semibold mb-2">ÉPIQUE</div>
              <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mb-3"></div>
              <div className="text-sm text-slate-400 mb-4">+25% Récompenses</div>
              <div className="text-xs text-slate-500">4% des cartes</div>
            </div>
            
            <div className="card card-legendary p-6 w-48 text-center bg-slate-800/50 shadow-xl transition-transform hover:scale-105">
              <div className="text-orange-400 font-semibold mb-2">LÉGENDAIRE</div>
              <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mb-3"></div>
              <div className="text-sm text-slate-400 mb-4">+40% Mode spécial</div>
              <div className="text-xs text-slate-500">1% des cartes</div>
            </div>
            
            <div className="card card-mythic p-6 w-48 text-center bg-slate-800/50 shadow-xl transition-transform hover:scale-105">
              <div className="text-red-400 font-semibold mb-2">MYTHIQUE</div>
              <div className="h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-3"></div>
              <div className="text-sm text-slate-400 mb-4">Pouvoir Unique</div>
              <div className="text-xs text-slate-500">0.1% des cartes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-indigo-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à devenir un expert de la prédiction?          
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de joueurs et commencez à construire votre collection dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 text-center flex items-center justify-center">
              Créer un compte gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="mt-8 text-sm text-slate-400">
            Aucune carte de crédit requise • Installation immédiate • 100% gratuit pour commencer
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/60 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
                CryptoPredict
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Le jeu de cartes stratégique basé sur la prédiction des prix de cryptomonnaies.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/game" className="hover:text-white transition-colors">Jouer</Link></li>
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition-colors">Classements</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Aide</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Légal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
            &copy; 2025 CryptoPredict. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
