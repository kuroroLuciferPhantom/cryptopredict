"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

// Types
interface Card {
  id: string;
  name: string;
  symbol: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  power: number;
  volatility: number;
  image?: string;
  figure?: string;
}

// Fonction pour générer un paquet aléatoire
const generateStarterPack = (): Card[] => {
  // Liste de cryptos possibles (à étendre selon vos besoins)
  const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC', figures: ['Satoshi Nakamoto', 'Hal Finney'] },
    { name: 'Ethereum', symbol: 'ETH', figures: ['Vitalik Buterin', 'Joseph Lubin'] },
    { name: 'Cardano', symbol: 'ADA', figures: ['Charles Hoskinson'] },
    { name: 'Solana', symbol: 'SOL', figures: ['Anatoly Yakovenko'] },
    { name: 'Polygon', symbol: 'MATIC', figures: ['Sandeep Nailwal'] },
    { name: 'Polkadot', symbol: 'DOT', figures: ['Gavin Wood'] },
    { name: 'Avalanche', symbol: 'AVAX', figures: ['Emin Gün Sirer'] },
    { name: 'Chainlink', symbol: 'LINK', figures: ['Sergey Nazarov'] },
    { name: 'Uniswap', symbol: 'UNI', figures: ['Hayden Adams'] },
    { name: 'Aave', symbol: 'AAVE', figures: ['Stani Kulechov'] },
    { name: 'Binance Coin', symbol: 'BNB', figures: ['Changpeng Zhao'] },
    { name: 'Ripple', symbol: 'XRP', figures: ['Brad Garlinghouse'] },
    { name: 'Dogecoin', symbol: 'DOGE', figures: ['Billy Markus'] },
    { name: 'Shiba Inu', symbol: 'SHIB', figures: ['Ryoshi'] }
  ];

  // Distribution des raretés
  // 6 communes, 3 rares, 1 épique+
  const rarityDistribution = [
    ...Array(6).fill('common'),
    ...Array(3).fill('rare'),
    Math.random() > 0.8 ? (Math.random() > 0.95 ? 'mythic' : 'legendary') : 'epic'
  ];

  // Génération des cartes
  return rarityDistribution.map((rarity, index) => {
    // Sélection aléatoire d'une crypto
    const cryptoIndex = Math.floor(Math.random() * cryptos.length);
    const crypto = cryptos[cryptoIndex];
    
    // Sélection aléatoire d'une figure pour cette crypto
    const figureIndex = Math.floor(Math.random() * crypto.figures.length);
    const figure = crypto.figures[figureIndex];
    
    // Calcul de la puissance et volatilité en fonction de la rareté
    let powerBase, volatilityBase;
    
    switch(rarity) {
      case 'common':
        powerBase = 60 + Math.floor(Math.random() * 16); // 60-75
        volatilityBase = 3 + Math.random() * 3; // 3-6
        break;
      case 'rare':
        powerBase = 76 + Math.floor(Math.random() * 11); // 76-86
        volatilityBase = 4 + Math.random() * 4; // 4-8
        break;
      case 'epic':
        powerBase = 87 + Math.floor(Math.random() * 8); // 87-94
        volatilityBase = 5 + Math.random() * 5; // 5-10
        break;
      case 'legendary':
        powerBase = 95 + Math.floor(Math.random() * 4); // 95-98
        volatilityBase = 7 + Math.random() * 4; // 7-11
        break;
      case 'mythic':
        powerBase = 99; // 99
        volatilityBase = 8 + Math.random() * 5; // 8-13
        break;
    }

    return {
      id: `${crypto.symbol.toLowerCase()}-${rarity}-${index}-${Date.now()}`,
      name: crypto.name,
      symbol: crypto.symbol,
      rarity,
      power: powerBase,
      volatility: parseFloat(volatilityBase.toFixed(1)),
      figure: figure
    };
  });
};

// Fonction pour lancer les confettis
const triggerConfetti = (rarity: string) => {
  // Couleurs selon la rareté
  let colors;
  switch(rarity) {
    case 'common':
      colors = ['#A0A0A0', '#C0C0C0']; // Gris
      break;
    case 'rare':
      colors = ['#3B82F6', '#60A5FA']; // Bleu
      break;
    case 'epic':
      colors = ['#8B5CF6', '#A78BFA']; // Violet
      break;
    case 'legendary':
      colors = ['#F59E0B', '#FBBF24']; // Orange
      break;
    case 'mythic':
      colors = ['#DC2626', '#EF4444']; // Rouge
      break;
  }

  // Configuration des confettis en fonction de la rareté
  const intensity = 
    rarity === 'common' ? 0.2 :
    rarity === 'rare' ? 0.4 :
    rarity === 'epic' ? 0.6 :
    rarity === 'legendary' ? 0.8 : 1;
    
  // Lancement des confettis
  confetti({
    particleCount: 100 * intensity,
    spread: 70,
    origin: { y: 0.6 },
    colors: colors,
    disableForReducedMotion: true
  });
};

export default function CardRevealPage() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPackOpening, setIsPackOpening] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Générer le paquet de démarrage
  useEffect(() => {
    setCards(generateStarterPack());
    
    // Simulation de chargement du paquet
    const timer = setTimeout(() => {
      setIsPackOpening(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Révéler la carte actuelle
  const revealCard = () => {
    setIsRevealed(true);
    
    // Déclenchement des confettis pour les cartes rares+
    const currentCard = cards[currentCardIndex];
    if (currentCard && currentCard.rarity !== 'common') {
      triggerConfetti(currentCard.rarity);
    }
  };

  // Passer à la carte suivante
  const nextCard = () => {
    setIsRevealed(false);
    
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
    } else {
      setIsComplete(true);
      
      // Redirection vers le profil après un court délai
      setTimeout(() => {
        router.push('/profile');
      }, 3000);
    }
  };

  // La carte actuelle
  const currentCard = cards[currentCardIndex];

  // Couleurs selon la rareté
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'text-gray-300 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-500';
      case 'epic': return 'text-purple-400 border-purple-500';
      case 'legendary': return 'text-orange-400 border-orange-500';
      case 'mythic': return 'text-red-400 border-red-500';
      default: return 'text-gray-300 border-gray-400';
    }
  };

  const getGlowColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return '';
      case 'rare': return 'glow-blue';
      case 'epic': return 'glow-purple';
      case 'legendary': return 'glow-orange';
      case 'mythic': return 'glow-red';
      default: return '';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'Commune';
      case 'rare': return 'Rare';
      case 'epic': return 'Épique';
      case 'legendary': return 'Légendaire';
      case 'mythic': return 'Mythique';
      default: return 'Commune';
    }
  };

  const getSymbolBgColor = (symbol: string) => {
    // Couleurs par symbole de crypto
    switch(symbol) {
      case 'BTC': return 'from-orange-500 to-yellow-500';
      case 'ETH': return 'from-purple-600 to-indigo-600';
      case 'SOL': return 'from-blue-600 to-green-400';
      case 'ADA': return 'from-blue-500 to-cyan-500';
      case 'DOT': return 'from-pink-500 to-fuchsia-500';
      case 'MATIC': return 'from-purple-500 to-violet-500';
      case 'AVAX': return 'from-red-500 to-rose-600';
      case 'LINK': return 'from-blue-400 to-sky-600';
      case 'DOGE': return 'from-yellow-400 to-amber-500';
      case 'SHIB': return 'from-amber-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white px-4">
      {/* Animation d'ouverture de paquet */}
      <AnimatePresence>
        {isPackOpening && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-64 h-96 bg-gradient-to-b from-blue-600 to-indigo-800 rounded-xl shadow-2xl border-4 border-blue-400 p-4 flex flex-col items-center justify-center relative overflow-hidden"
              initial={{ scale: 0.5, rotateY: 0 }}
              animate={{ 
                scale: [0.5, 1.1, 1],
                rotateY: [0, 15, 0, -15, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 2.5, times: [0, 0.5, 1] }}
            >
              <div className="absolute inset-0 bg-blue-500/20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-400/30 to-transparent"></div>
              </div>
              <motion.div 
                className="text-4xl font-bold text-center text-white z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Paquet de démarrage
              </motion.div>
              <motion.div 
                className="mt-4 text-white/80 text-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                10 cartes à découvrir
              </motion.div>
              <motion.div 
                className="absolute bottom-8 w-32 h-32"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-10 h-10 text-white/30" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <div className="max-w-lg w-full py-8">
        {!isPackOpening && !isComplete && (
          <>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">Découvrez vos cartes!</h1>
              <p className="text-slate-300 mt-2">Carte {currentCardIndex + 1} sur {cards.length}</p>
            </div>

            <div className="flex justify-center mb-12">
              <motion.div 
                className={`relative w-64 h-96 rounded-xl overflow-hidden shadow-2xl transform perspective-1000 ${!isRevealed ? 'cursor-pointer' : ''}`}
                onClick={!isRevealed ? revealCard : undefined}
                animate={{ rotateY: isRevealed ? 0 : 180 }}
                transition={{ duration: 0.6 }}
              >
                {/* Dos de la carte (face visible quand !isRevealed) */}
                <div className={`absolute inset-0 w-full h-full backface-hidden ${isRevealed ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-full h-full bg-gradient-to-b from-blue-800 to-indigo-900 flex flex-col items-center justify-center p-4 border-2 border-blue-500 rounded-xl">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                      <span className="text-white text-2xl font-bold">CP</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">CryptoPredict</h3>
                    <div className="mt-2 text-blue-300 text-sm">Cliquez pour révéler</div>
                  </div>
                </div>

                {/* Face de la carte (visible quand isRevealed) */}
                {currentCard && (
                  <motion.div 
                    className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-4 flex flex-col border-2 ${getRarityColor(currentCard.rarity)} ${getGlowColor(currentCard.rarity)}`}
                    initial={{ rotateY: -180 }}
                    animate={{ rotateY: isRevealed ? 0 : -180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`px-2 py-1 ${getRarityColor(currentCard.rarity)} bg-opacity-20 rounded-md text-sm font-medium`}>
                        {getRarityLabel(currentCard.rarity)}
                      </span>
                      <span className="font-bold text-white">{currentCard.symbol}</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                      <div className={`w-20 h-20 bg-gradient-to-br ${getSymbolBgColor(currentCard.symbol)} rounded-full mb-4 flex items-center justify-center`}>
                        <span className="text-white text-2xl font-bold">
                          {currentCard.symbol.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{currentCard.name}</h3>
                      {currentCard.figure && (
                        <div className={`${getRarityColor(currentCard.rarity)} mt-2 text-sm`}>{currentCard.figure}</div>
                      )}
                    </div>
                    <div className="border-t border-slate-700 pt-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-slate-400">Puissance: <span className="text-white">{currentCard.power}</span></div>
                        <div className="text-slate-400">Volatilité: <span className="text-white">{currentCard.volatility}</span></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {isRevealed && (
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={nextCard}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 flex items-center"
                >
                  {currentCardIndex < cards.length - 1 ? (
                    <>
                      Carte suivante
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Terminer
                      <X className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Écran de fin */}
        {isComplete && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-4">Félicitations!</h1>
            <p className="text-xl text-slate-300 mb-6">Vous avez débloqué vos 10 premières cartes.</p>
            <p className="text-lg text-slate-400 mb-8">Redirection vers votre profil...</p>
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          </motion.div>
        )}
      </div>
    </div>
  );
}