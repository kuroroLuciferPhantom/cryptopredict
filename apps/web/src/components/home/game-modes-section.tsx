'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Flame, Coins, Trophy } from 'lucide-react';

const gameModes = [
  {
    icon: <TrendingUp className="h-10 w-10 text-blue-500" />,
    title: 'Mode Classique',
    description: 'Prédisez la hausse ou la baisse des prix des cryptomonnaies et gagnez des points en fonction de la précision de vos prédictions.',
    color: 'from-blue-900/20 to-blue-700/20',
    border: 'border-blue-900/50',
  },
  {
    icon: <Flame className="h-10 w-10 text-amber-500" />,
    title: 'Mode Stabilité',
    description: 'Contraire au mode classique, prédisez les cryptomonnaies qui resteront les plus stables sur une période donnée.',
    color: 'from-amber-900/20 to-amber-700/20',
    border: 'border-amber-900/50',
  },
  {
    icon: <Coins className="h-10 w-10 text-purple-500" />,
    title: 'Mode Meme Coins',
    description: 'Exclusivement centré sur les cryptomonnaies mèmes comme DOGE et SHIB. Volatilité élevée et prédictions risquées.',
    color: 'from-purple-900/20 to-purple-700/20',
    border: 'border-purple-900/50',
  },
  {
    icon: <Trophy className="h-10 w-10 text-green-500" />,
    title: 'Tournois Temporaires',
    description: 'Participez à des événements à durée limitée avec des règles spéciales et des récompenses exclusives.',
    color: 'from-green-900/20 to-green-700/20',
    border: 'border-green-900/50',
  },
];

export function GameModesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Modes de jeu diversifiés</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            CryptoPredict propose plusieurs modes de jeu pour tous les types de joueurs, des débutants aux experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gameModes.map((mode, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${mode.color} rounded-xl p-8 border ${mode.border} hover:shadow-lg transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{mode.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{mode.title}</h3>
              <p className="text-gray-300">{mode.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
