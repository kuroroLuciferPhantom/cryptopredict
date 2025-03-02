'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CardComponent, CardRarity } from '../ui/card-component';
import { PredictionCard } from '../ui/prediction-card';
import { Activity, CreditCard, Package, ShoppingBag, BadgeCheck } from 'lucide-react';

// Mock data for user cards
const mockUserCards = [
  {
    id: 'card1',
    name: 'Satoshi Nakamoto',
    rarity: 'LEGENDARY' as CardRarity,
    power: 95,
    volatility: 35,
    cryptoSymbol: 'BTC',
    isNFT: true,
    bonusAttributes: {
      'Précision': '+12%',
      'Bonus BTC': '+15%'
    }
  },
  {
    id: 'card2',
    name: 'Vitalik Buterin',
    rarity: 'EPIC' as CardRarity,
    power: 87,
    volatility: 42,
    cryptoSymbol: 'ETH',
    isNFT: false,
    bonusAttributes: {
      'Durée': '+8%'
    }
  },
  {
    id: 'card3',
    name: 'Charles Hoskinson',
    rarity: 'RARE' as CardRarity,
    power: 78,
    volatility: 38,
    cryptoSymbol: 'ADA',
    isNFT: false
  },
  {
    id: 'card4',
    name: 'Jesse Powell',
    rarity: 'COMMON' as CardRarity,
    power: 65,
    volatility: 30,
    cryptoSymbol: 'DOT',
    isNFT: false
  },
];

// Mock data for user predictions
const mockPredictions = [
  {
    id: 'pred1',
    cryptoSymbol: 'BTC',
    predictionType: 'DIRECTION',
    direction: 'UP',
    startPrice: 35420.50,
    endPrice: 35680.25,
    startedAt: new Date(Date.now() - 3600000 * 24 * 3), // 3 days ago
    expiresAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
    resolvedAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
    status: 'RESOLVED',
    isCorrect: true,
    reward: 12.5,
  },
  {
    id: 'pred2',
    cryptoSymbol: 'ETH',
    predictionType: 'PRICE_TARGET',
    targetValue: 2400,
    startPrice: 2304.75,
    currentPrice: 2320.30,
    startedAt: new Date(Date.now() - 3600000 * 4), // 4 hours ago
    expiresAt: new Date(Date.now() + 3600000 * 20), // 20 hours from now
    status: 'ACTIVE',
  },
  {
    id: 'pred3',
    cryptoSymbol: 'SOL',
    predictionType: 'PERCENTAGE_CHANGE',
    targetValue: 5,
    direction: 'UP',
    startPrice: 105.38,
    endPrice: 104.20,
    startedAt: new Date(Date.now() - 3600000 * 48), // 2 days ago
    expiresAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
    resolvedAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
    status: 'RESOLVED',
    isCorrect: false,
  },
];

// Mock data for transactions
const mockTransactions = [
  {
    id: 'tx1',
    type: 'BUY',
    item: 'Vitalik Buterin Card',
    amount: 230,
    date: new Date(Date.now() - 3600000 * 24 * 5), // 5 days ago
  },
  {
    id: 'tx2',
    type: 'REWARD',
    item: 'Prédiction BTC correcte',
    amount: 12.5,
    date: new Date(Date.now() - 3600000 * 24 * 3), // 3 days ago
  },
  {
    id: 'tx3',
    type: 'SELL',
    item: 'Gavin Wood Card',
    amount: 85,
    date: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
  },
];

export function ProfileTabs() {
  return (
    <Tabs defaultValue="collection" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8 bg-gray-800/50">
        <TabsTrigger value="collection" className="flex items-center justify-center py-3">
          <Package className="h-5 w-5 mr-2" />
          <span>Collection</span>
        </TabsTrigger>
        <TabsTrigger value="predictions" className="flex items-center justify-center py-3">
          <Activity className="h-5 w-5 mr-2" />
          <span>Prédictions</span>
        </TabsTrigger>
        <TabsTrigger value="marketplace" className="flex items-center justify-center py-3">
          <ShoppingBag className="h-5 w-5 mr-2" />
          <span>Ventes</span>
        </TabsTrigger>
        <TabsTrigger value="transactions" className="flex items-center justify-center py-3">
          <CreditCard className="h-5 w-5 mr-2" />
          <span>Transactions</span>
        </TabsTrigger>
      </TabsList>

      {/* Collection Tab */}
      <TabsContent value="collection">
        <div className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Vos Cartes ({mockUserCards.length})</h2>
            <button className="bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg text-sm">
              Trier par rareté
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockUserCards.map((card) => (
              <CardComponent
                key={card.id}
                id={card.id}
                name={card.name}
                rarity={card.rarity}
                power={card.power}
                volatility={card.volatility}
                cryptoSymbol={card.cryptoSymbol}
                isNFT={card.isNFT}
                bonusAttributes={card.bonusAttributes}
              />
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Predictions Tab */}
      <TabsContent value="predictions">
        <div className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Vos Prédictions</h2>
            <div className="flex space-x-2">
              <button className="bg-blue-600 px-3 py-1 rounded-full text-xs">Actives</button>
              <button className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-xs">Historique</button>
            </div>
          </div>

          <div className="space-y-4">
            {mockPredictions.map((prediction) => (
              <PredictionCard
                key={prediction.id}
                id={prediction.id}
                cryptoSymbol={prediction.cryptoSymbol}
                predictionType={prediction.predictionType as any}
                targetValue={prediction.targetValue}
                direction={prediction.direction as any}
                startPrice={prediction.startPrice}
                currentPrice={prediction.currentPrice}
                endPrice={prediction.endPrice}
                startedAt={prediction.startedAt}
                expiresAt={prediction.expiresAt}
                resolvedAt={prediction.resolvedAt}
                status={prediction.status as any}
                isCorrect={prediction.isCorrect}
                reward={prediction.reward}
              />
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Marketplace Tab */}
      <TabsContent value="marketplace">
        <div className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Vos Ventes</h2>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm">
              Vendre une carte
            </button>
          </div>

          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Aucune carte en vente</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Vous n'avez actuellement aucune carte en vente sur le marketplace. Mettez en vente vos cartes pour gagner des crédits!
            </p>
          </div>
        </div>
      </TabsContent>

      {/* Transactions Tab */}
      <TabsContent value="transactions">
        <div className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Historique des Transactions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/70 border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-300">
                      {tx.date.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${tx.type === 'BUY' ? 'bg-red-900/20 text-red-400' : 
                          tx.type === 'SELL' ? 'bg-green-900/20 text-green-400' : 
                          'bg-blue-900/20 text-blue-400'}`}>
                        {tx.type === 'BUY' ? 'Achat' : 
                          tx.type === 'SELL' ? 'Vente' : 
                          'Récompense'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      {tx.item}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium">
                      <span className={`${tx.type === 'BUY' ? 'text-red-400' : 'text-green-400'}`}>
                        {tx.type === 'BUY' ? '-' : '+'}{tx.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
