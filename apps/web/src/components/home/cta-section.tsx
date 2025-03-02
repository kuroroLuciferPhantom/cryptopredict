'use client';

import { Button } from '@cryptopredict/ui';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-12 border border-blue-800/50 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Prêt à commencer votre aventure
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                dans le monde de CryptoPredict?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Rejoignez des milliers de joueurs et testez vos compétences de prédiction. 
              Commencez gratuitement dès aujourd'hui!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/game">
                <Button 
                  size="large" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8"
                >
                  Jouer maintenant
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button 
                  variant="secondary" 
                  size="large"
                  className="px-8"
                >
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
