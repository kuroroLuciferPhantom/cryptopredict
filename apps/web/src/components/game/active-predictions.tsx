'use client';

import { PredictionCard, PredictionCardProps } from '../ui/prediction-card';

// Mock data for active predictions
const mockActivePredictions: Partial<PredictionCardProps>[] = [
  {
    id: 'pred1',
    cryptoSymbol: 'BTC',
    predictionType: 'DIRECTION',
    direction: 'UP',
    startPrice: 35420.50,
    currentPrice: 35680.25,
    startedAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    expiresAt: new Date(Date.now() + 3600000 * 22), // 22 hours from now
    status: 'ACTIVE',
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
    currentPrice: 107.25,
    startedAt: new Date(Date.now() - 3600000 * 6), // 6 hours ago
    expiresAt: new Date(Date.now() + 3600000 * 18), // 18 hours from now
    status: 'ACTIVE',
  },
];

export function ActivePredictions() {
  return (
    <div>
      {mockActivePredictions.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-400">Vous n'avez aucune prédiction active. Créez-en une maintenant !</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockActivePredictions.map((prediction) => (
            <PredictionCard
              key={prediction.id}
              id={prediction.id!}
              cryptoSymbol={prediction.cryptoSymbol!}
              predictionType={prediction.predictionType!}
              targetValue={prediction.targetValue}
              direction={prediction.direction}
              startPrice={prediction.startPrice!}
              currentPrice={prediction.currentPrice}
              startedAt={prediction.startedAt!}
              expiresAt={prediction.expiresAt!}
              status={prediction.status!}
              onClick={() => alert(`Détails de la prédiction ${prediction.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}