'use client';

import { useState } from 'react';
import { CardComponent, CardRarity } from '../ui/card-component';
import { BadgeCheck, Loader2 } from 'lucide-react';

// Mock data for marketplace listings
interface CardListing {
  id: string;
  cardId: string;
  name: string;
  description?: string;
  image?: string;
  rarity: CardRarity;
  power: number;
  volatility: number;
  cryptoSymbol: string;
  price: number;
  seller: string;
  createdAt: Date;
  isNFT: boolean;
  bonusAttributes?: Record<string, string | number>;
}

const mockListings: CardListing[] = [
  {
    id: 'listing1',
    cardId: 'card1',
    name: 'Satoshi Nakamoto',
    rarity: 'LEGENDARY',
    power: 95,
    volatility: 35,
    cryptoSymbol: 'BTC',
    price: 450,
    seller: 'CryptoKing',
    createdAt: new Date(Date.now() - 3600000 * 5),
    isNFT: true,
    bonusAttributes: {
      'Précision': '+12%',
      'Bonus BTC': '+15%'
    }
  },
  {
    id: 'listing2',
    cardId: 'card2',
    name: 'Vitalik Buterin',
    rarity: 'EPIC',
    power: 87,
    volatility: 42,
    cryptoSymbol: 'ETH',
    price: 230,
    seller: 'EtherFan01',
    createdAt: new Date(Date.now() - 3600000 * 12),
    isNFT: false,
    bonusAttributes: {
      'Durée': '+8%'
    }
  },
  {
    id: 'listing3',
    cardId: 'card3',
    name: 'Charles Hoskinson',
    rarity: 'RARE',
    power: 78,
    volatility: 38,
    cryptoSymbol: 'ADA',
    price: 95,
    seller: 'Cardano4Ever',
    createdAt: new Date(Date.now() - 3600000 * 24),
    isNFT: false
  },
  {
    id: 'listing4',
    cardId: 'card4',
    name: 'Anatoly Yakovenko',
    rarity: 'EPIC',
    power: 85,
    volatility: 45,
    cryptoSymbol: 'SOL',
    price: 180,
    seller: 'SolanaFan',
    createdAt: new Date(Date.now() - 3600000 * 36),
    isNFT: true,
    bonusAttributes: {
      'Stabilité': '+10%'
    }
  },
  {
    id: 'listing5',
    cardId: 'card5',
    name: 'Gavin Wood',
    rarity: 'RARE',
    power: 79,
    volatility: 36,
    cryptoSymbol: 'DOT',
    price: 110,
    seller: 'PolkaDreamer',
    createdAt: new Date(Date.now() - 3600000 * 48),
    isNFT: false
  },
  {
    id: 'listing6',
    cardId: 'card6',
    name: 'Billy Markus',
    rarity: 'COMMON',
    power: 65,
    volatility: 60,
    cryptoSymbol: 'DOGE',
    price: 50,
    seller: 'DogeToTheMoon',
    createdAt: new Date(Date.now() - 3600000 * 72),
    isNFT: false
  },
];

export function MarketplaceListing() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePurchase = (listing: CardListing) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Achat réussi de ${listing.name} pour ${listing.price} crédits!`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Résultats ({mockListings.length})</h2>
        <div className="text-sm text-gray-400">
          Page 1 sur 1
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing) => (
          <div key={listing.id} className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 transition-all hover:border-gray-700">
            <div className="p-4">
              <CardComponent
                id={listing.cardId}
                name={listing.name}
                description={listing.description}
                image={listing.image}
                rarity={listing.rarity}
                power={listing.power}
                volatility={listing.volatility}
                cryptoSymbol={listing.cryptoSymbol}
                isNFT={listing.isNFT}
                bonusAttributes={listing.bonusAttributes}
                onClick={() => setSelectedCard(selectedCard === listing.id ? null : listing.id)}
                isSelected={selectedCard === listing.id}
              />
            </div>

            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-400">Vendeur</div>
                <div className="flex items-center">
                  <span className="text-sm">{listing.seller}</span>
                  <BadgeCheck className="h-4 w-4 text-blue-400 ml-1" />
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-400">Prix</div>
                <div className="text-xl font-bold">{listing.price} crédits</div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                onClick={() => handlePurchase(listing)}
                disabled={isLoading}
              >
                {isLoading && selectedCard === listing.id ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Achat en cours...
                  </>
                ) : (
                  'Acheter maintenant'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}