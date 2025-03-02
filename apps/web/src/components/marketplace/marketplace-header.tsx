'use client';

import { useState } from 'react';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { Button } from '@cryptopredict/ui';

export function MarketplaceHeader() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<string>('recent');

  return (
    <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Rechercher des cartes..."
          />
        </div>

        {/* View and sort controls */}
        <div className="flex items-center space-x-4">
          {/* Sort dropdown */}
          <div className="flex-shrink-0">
            <select
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recent">Plus récent</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="rarity">Rareté</option>
              <option value="power">Puissance</option>
            </select>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
            <button
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-700' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-5 h-5 text-gray-300" />
            </button>
            <button
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-700' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* Sell button */}
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Vendre une carte
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-800/50 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Total des cartes</div>
          <div className="text-xl font-semibold">374</div>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Vos cartes en vente</div>
          <div className="text-xl font-semibold">3</div>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Prix moyen</div>
          <div className="text-xl font-semibold">124.5  <span className="text-sm font-normal text-gray-400">crédits</span></div>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg hidden md:block">
          <div className="text-sm text-gray-400">Votre solde</div>
          <div className="text-xl font-semibold">540.25  <span className="text-sm font-normal text-gray-400">crédits</span></div>
        </div>
      </div>
    </div>
  );
}