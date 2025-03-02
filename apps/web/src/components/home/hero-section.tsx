'use client';

import { Button } from '@cryptopredict/ui';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Prédisez. Collectionnez.
              </span>
              <span className="block mt-2">Dominez le marché.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              CryptoPredict est un jeu de cartes stratégique où vous collectionnez des cartes 
              crypto, prédisez l'évolution des prix et gagnez des récompenses basées sur la 
              précision de vos prédictions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/game">
                <Button 
                  size="large" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                >
                  Commencer à jouer
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="secondary" 
                  size="large"
                >
                  En savoir plus
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] w-full">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
              <div className="relative z-10 h-full w-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 transform rotate-12">
                  <div className="crypto-card crypto-card-rare p-4 w-40 h-56 transform rotate-[-6deg] translate-y-4 animate-float card-glow-effect card-glow-rare">
                    <div className="text-xs text-blue-300 mb-1">RARE</div>
                    <div className="text-sm font-bold mb-2">Bitcoin</div>
                    <div className="bg-blue-900/30 h-20 rounded mb-2"></div>
                    <div className="text-xs text-blue-300">Puissance: 75</div>
                    <div className="text-xs text-blue-300">Volatilité: 25%</div>
                  </div>
                  <div className="crypto-card crypto-card-epic p-4 w-40 h-56 transform rotate-6 -translate-y-4 animate-float card-glow-effect card-glow-epic">
                    <div className="text-xs text-purple-300 mb-1">EPIC</div>
                    <div className="text-sm font-bold mb-2">Ethereum</div>
                    <div className="bg-purple-900/30 h-20 rounded mb-2"></div>
                    <div className="text-xs text-purple-300">Puissance: 85</div>
                    <div className="text-xs text-purple-300">Volatilité: 35%</div>
                  </div>
                  <div className="crypto-card crypto-card-legendary p-4 w-40 h-56 transform rotate-[-8deg] translate-y-2 animate-float card-glow-effect card-glow-legendary">
                    <div className="text-xs text-amber-300 mb-1">LEGENDARY</div>
                    <div className="text-sm font-bold mb-2">Solana</div>
                    <div className="bg-amber-900/30 h-20 rounded mb-2"></div>
                    <div className="text-xs text-amber-300">Puissance: 92</div>
                    <div className="text-xs text-amber-300">Volatilité: 45%</div>
                  </div>
                  <div className="crypto-card crypto-card-mythic p-4 w-40 h-56 transform rotate-12 -translate-y-2 animate-float card-glow-effect card-glow-mythic">
                    <div className="text-xs text-red-300 mb-1">MYTHIC</div>
                    <div className="text-sm font-bold mb-2">Cardano</div>
                    <div className="bg-red-900/30 h-20 rounded mb-2"></div>
                    <div className="text-xs text-red-300">Puissance: 98</div>
                    <div className="text-xs text-red-300">Volatilité: 55%</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
