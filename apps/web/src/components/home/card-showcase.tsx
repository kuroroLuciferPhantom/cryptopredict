'use client';

import { motion } from 'framer-motion';

const rarityLevels = [
  {
    name: 'Commune',
    cardClass: 'crypto-card-common',
    description: 'Les cartes communes sont faciles à obtenir et représentent le point de départ pour tout joueur.',
    glowEffect: '',
    color: 'text-game-common',
  },
  {
    name: 'Rare',
    cardClass: 'crypto-card-rare',
    description: 'Les cartes rares offrent de meilleurs bonus de prédiction et sont moins fréquentes.',
    glowEffect: 'card-glow-effect card-glow-rare',
    color: 'text-game-rare',
  },
  {
    name: 'Épique',
    cardClass: 'crypto-card-epic',
    description: 'Les cartes épiques sont puissantes et apportent des avantages significatifs à votre stratégie.',
    glowEffect: 'card-glow-effect card-glow-epic',
    color: 'text-game-epic',
  },
  {
    name: 'Légendaire',
    cardClass: 'crypto-card-legendary',
    description: 'Très difficiles à obtenir, les cartes légendaires offrent des capacités uniques et puissantes.',
    glowEffect: 'card-glow-effect card-glow-legendary',
    color: 'text-game-legendary',
  },
  {
    name: 'Mythique',
    cardClass: 'crypto-card-mythic',
    description: 'Les cartes mythiques sont extrêmement rares et possèdent les bonus les plus puissants du jeu.',
    glowEffect: 'card-glow-effect card-glow-mythic',
    color: 'text-game-mythic',
  },
];

export function CardShowcase() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cartes et Raretés</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Collectionnez des cartes de différentes raretés, chacune avec ses propres attributs et avantages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {rarityLevels.map((rarity, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`${rarity.cardClass} ${rarity.glowEffect} w-48 h-64 p-4 mb-4`}>
                <div className={`text-xs ${rarity.color} mb-1`}>{rarity.name.toUpperCase()}</div>
                <div className="text-sm font-bold mb-2">Exemple</div>
                <div className="bg-gray-800/50 h-24 rounded mb-4"></div>
                <div className={`text-xs ${rarity.color} mb-1`}>Puissance: {60 + index * 10}</div>
                <div className={`text-xs ${rarity.color} mb-1`}>Volatilité: {20 + index * 10}%</div>
                <div className={`text-xs ${rarity.color}`}>Bonus: +{5 + index * 5}%</div>
              </div>
              <h3 className={`text-xl font-bold ${rarity.color} mb-2`}>{rarity.name}</h3>
              <p className="text-gray-400 text-center text-sm">{rarity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
