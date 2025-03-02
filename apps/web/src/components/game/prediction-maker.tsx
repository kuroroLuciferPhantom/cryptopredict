'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface PredictionMakerProps {
  crypto: {
    symbol: string;
    name: string;
    currentPrice: number;
  };
}

type PredictionDirection = 'UP' | 'DOWN' | 'STABLE';
type PredictionTimeframe = '1h' | '4h' | '24h' | '3d' | '7d';

export function PredictionMaker({ crypto }: PredictionMakerProps) {
  const [direction, setDirection] = useState<PredictionDirection>('UP');
  const [timeframe, setTimeframe] = useState<PredictionTimeframe>('24h');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [targetPercentage, setTargetPercentage] = useState<string>('');
  const [predictionType, setPredictionType] = useState<'price' | 'percentage'>('percentage');

  // Convert timeframe to readable text
  const timeframeText = {
    '1h': '1 heure',
    '4h': '4 heures',
    '24h': '24 heures',
    '3d': '3 jours',
    '7d': '7 jours',
  };

  // Calculate expected reward based on prediction parameters
  const calculateReward = () => {
    // Base reward factor
    let factor = 1.0;

    // Adjust factor based on timeframe (shorter = lower reward)
    if (timeframe === '1h') factor *= 0.8;
    if (timeframe === '4h') factor *= 0.9;
    if (timeframe === '3d') factor *= 1.2;
    if (timeframe === '7d') factor *= 1.5;

    // Adjust factor based on direction (STABLE is harder)
    if (direction === 'STABLE') factor *= 1.3;

    // Adjust factor based on target percentage (higher % = higher reward)
    const percentage = parseFloat(targetPercentage);
    if (!isNaN(percentage)) {
      factor *= (1 + (percentage / 100));
    }

    return (10 * factor).toFixed(2);
  };

  const handleSubmit = () => {
    // Here would be the API call to create a prediction
    console.log('Creating prediction', {
      cryptoSymbol: crypto.symbol,
      direction,
      timeframe,
      predictionType,
      targetPrice: predictionType === 'price' ? parseFloat(targetPrice) : undefined,
      targetPercentage: predictionType === 'percentage' ? parseFloat(targetPercentage) : undefined,
      startPrice: crypto.currentPrice,
    });

    // Reset form or navigate
    alert('Prédiction créée avec succès!');
  };

  return (
    <div className="space-y-6">
      {/* Direction selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Direction prédite</label>
        <div className="flex space-x-3">
          <button
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${direction === 'UP' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setDirection('UP')}
          >
            <ArrowUpRight size={18} />
            <span>Hausse</span>
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${direction === 'DOWN' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setDirection('DOWN')}
          >
            <ArrowDownRight size={18} />
            <span>Baisse</span>
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${direction === 'STABLE' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setDirection('STABLE')}
          >
            <Minus size={18} />
            <span>Stable</span>
          </button>
        </div>
      </div>

      {/* Timeframe selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Durée de la prédiction</label>
        <div className="grid grid-cols-5 gap-2">
          {(['1h', '4h', '24h', '3d', '7d'] as const).map((tf) => (
            <button
              key={tf}
              className={`py-2 px-3 rounded-lg text-sm ${timeframe === tf ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Prediction type selector */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Type de prédiction</label>
        <div className="flex space-x-3">
          <button
            className={`flex-1 py-2 px-3 rounded-lg ${predictionType === 'price' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setPredictionType('price')}
          >
            Prix cible
          </button>
          <button
            className={`flex-1 py-2 px-3 rounded-lg ${predictionType === 'percentage' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setPredictionType('percentage')}
          >
            Pourcentage
          </button>
        </div>
      </div>

      {/* Target input */}
      {predictionType === 'price' ? (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Prix cible (en $)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-400">$</span>
            </div>
            <input
              type="number"
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3"
              placeholder="Entrez le prix cible"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Prix actuel: ${crypto.currentPrice.toFixed(2)}
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Pourcentage de changement</label>
          <div className="relative">
            <input
              type="number"
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Entrez le pourcentage"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(e.target.value)}
              min="0"
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-400">%</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Plus le pourcentage est élevé, plus la récompense potentielle est grande.
          </div>
        </div>
      )}

      {/* Summary and submit */}
      <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Résumé de la prédiction</h3>
        <div className="text-sm text-gray-400 space-y-1">
          <div>Crypto: <span className="text-white">{crypto.symbol} ({crypto.name})</span></div>
          <div>Direction: <span className="text-white">
            {direction === 'UP' ? 'Hausse' : direction === 'DOWN' ? 'Baisse' : 'Stable'}
          </span></div>
          <div>Durée: <span className="text-white">{timeframeText[timeframe]}</span></div>
          {predictionType === 'price' && targetPrice && (
            <div>Prix cible: <span className="text-white">${parseFloat(targetPrice).toFixed(2)}</span></div>
          )}
          {predictionType === 'percentage' && targetPercentage && (
            <div>Changement: <span className="text-white">{parseFloat(targetPercentage).toFixed(1)}%</span></div>
          )}
          <div>Récompense potentielle: <span className="text-green-400">{calculateReward()} crédits</span></div>
        </div>
      </div>

      <button
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        onClick={handleSubmit}
      >
        Créer cette prédiction
      </button>
    </div>
  );
}
