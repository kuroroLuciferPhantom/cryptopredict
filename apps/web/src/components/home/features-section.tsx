'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award, ShoppingBag, Zap } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
    title: 'Prédiction de prix',
    description: 'Utilisez votre connaissance du marché pour prédire l\'évolution des prix des cryptomonnaies.',
  },
  {
    icon: <Award className="h-8 w-8 text-purple-500" />,
    title: 'Collection de cartes',
    description: 'Collectionnez des cartes de différentes raretés représentant diverses cryptomonnaies et personnalités.',
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-amber-500" />,
    title: 'Marketplace',
    description: 'Achetez, vendez et échangez vos cartes avec d\'autres joueurs pour compléter votre collection.',
  },
  {
    icon: <Zap className="h-8 w-8 text-red-500" />,
    title: 'Cartes NFT',
    description: 'En phase 2, transformez vos cartes en NFT sur la blockchain Base pour une véritable propriété.',
  },
];

export function FeaturesSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Caractéristiques principales</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            CryptoPredict combine collection de cartes, stratégie et analyse de marché pour une expérience de jeu unique.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
