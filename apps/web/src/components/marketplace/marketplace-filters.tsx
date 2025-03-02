'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterGroup({ title, children, defaultOpen = true }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-800 py-4">
      <button
        className="flex items-center justify-between w-full text-left font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);

  const handleRarityToggle = (rarity: string) => {
    setSelectedRarities(prev =>
      prev.includes(rarity) 
        ? prev.filter(r => r !== rarity)
        : [...prev, rarity]
    );
  };

  const handleCryptoToggle = (crypto: string) => {
    setSelectedCryptos(prev =>
      prev.includes(crypto) 
        ? prev.filter(c => c !== crypto)
        : [...prev, crypto]
    );
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([value, priceRange[1]]);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], value]);
  };

  const rarities = [
    { id: 'common', name: 'Commune', color: 'bg-game-common' },
    { id: 'rare', name: 'Rare', color: 'bg-game-rare' },
    { id: 'epic', name: 'Epique', color: 'bg-game-epic' },
    { id: 'legendary', name: 'Légendaire', color: 'bg-game-legendary' },
    { id: 'mythic', name: 'Mythique', color: 'bg-game-mythic' },
  ];

  const cryptos = [
    { id: 'btc', name: 'Bitcoin (BTC)' },
    { id: 'eth', name: 'Ethereum (ETH)' },
    { id: 'sol', name: 'Solana (SOL)' },
    { id: 'ada', name: 'Cardano (ADA)' },
    { id: 'doge', name: 'Dogecoin (DOGE)' },
    { id: 'dot', name: 'Polkadot (DOT)' },
    { id: 'link', name: 'Chainlink (LINK)' },
    { id: 'avax', name: 'Avalanche (AVAX)' },
  ];

  return (
    <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">Filtres</h2>
      
      <FilterGroup title="Prix">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Min.</label>
              <input
                type="number"
                min="0"
                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                value={priceRange[0]}
                onChange={handlePriceMinChange}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Max.</label>
              <input
                type="number"
                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                value={priceRange[1]}
                onChange={handlePriceMaxChange}
              />
            </div>
          </div>
          <div className="relative pt-1">
            <div className="text-right text-sm text-gray-400">0 - 1000+ crédits</div>
          </div>
        </div>
      </FilterGroup>
      
      <FilterGroup title="Rareté">
        <div className="space-y-2">
          {rarities.map(rarity => (
            <div key={rarity.id} className="flex items-center">
              <input
                id={`rarity-${rarity.id}`}
                type="checkbox"
                className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                checked={selectedRarities.includes(rarity.id)}
                onChange={() => handleRarityToggle(rarity.id)}
              />
              <label htmlFor={`rarity-${rarity.id}`} className="ml-2 flex items-center">
                <span className={`inline-block w-3 h-3 rounded-full ${rarity.color} mr-2`}></span>
                <span>{rarity.name}</span>
              </label>
            </div>
          ))}
        </div>
      </FilterGroup>
      
      <FilterGroup title="Cryptomonnaie">
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {cryptos.map(crypto => (
            <div key={crypto.id} className="flex items-center">
              <input
                id={`crypto-${crypto.id}`}
                type="checkbox"
                className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                checked={selectedCryptos.includes(crypto.id)}
                onChange={() => handleCryptoToggle(crypto.id)}
              />
              <label htmlFor={`crypto-${crypto.id}`} className="ml-2">
                {crypto.name}
              </label>
            </div>
          ))}
        </div>
      </FilterGroup>
      
      <FilterGroup title="NFT" defaultOpen={false}>
        <div className="flex items-center">
          <input
            id="nft-only"
            type="checkbox"
            className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
          />
          <label htmlFor="nft-only" className="ml-2">
            Uniquement les NFT
          </label>
        </div>
      </FilterGroup>
      
      <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
        Appliquer les filtres
      </button>
      <button className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors">
        Réinitialiser
      </button>
    </div>
  );
}