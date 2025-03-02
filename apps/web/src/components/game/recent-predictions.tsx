'use client';

import { PredictionCard, PredictionCardProps } from '../ui/prediction-card';

// Mock data for resolved predictions
const mockResolvedPredictions: Partial<PredictionCardProps>[] = [
  {
    id: 'past1',
    cryptoSymbol: 'ETH',
    predictionType: 'DIRECTION',
    direction: 'UP',
    startPrice: 2250.75,
    endPrice: 2304.75,
    startedAt: new Date(Date.now() - 3600000 * 48), // 48 hours ago
    expiresAt: new Date(Date.now() - 3600000 * 24), // 24 hours ago
    resolvedAt: new Date(Date.now() - 3600000 * 24), // 24 hours ago
    status: 'RESOLVED',
    isCorrect: true,
    reward: 12.5,
  },
  {
    id: 'past2',
    cryptoSymbol: 'BTC',
    predictionType: 'PRICE_TARGET',
    targetValue: 36000,
    startPrice: 34500.50,
    endPrice: 35420.50,
    startedAt: new Date(Date.now() - 3600000 * 72), // 72 hours ago
    expiresAt: new Date(Date.now() - 3600000 * 48), // 48 hours ago
    resolvedAt: new Date(Date.now() - 3600000 * 48), // 48 hours ago
    status: 'RESOLVED',
    isCorrect: false,
  },
  {
    id: 'past3',
    cryptoSymbol: 'DOGE',
    predictionType: 'PERCENTAGE_CHANGE',
    targetValue: 10,
    direction: 'UP',
    startPrice: 0.085,
    endPrice: 0.089,
    startedAt: new Date(Date.now() - 3600000 * 96), // 96 hours ago
    expiresAt: new Date(Date.now() - 3600000 * 72), // 72 hours ago
    resolvedAt: new Date(Date.now() - 3600000 * 72), // 72 hours ago
    status: 'RESOLVED',
    isCorrect: false,
  },
  {
    id: 'past4',
    cryptoSymbol: 'SOL',
    predictionType: 'STABILITY',
    targetValue: 2,
    startPrice: 104.50,
    endPrice: 105.38,
    startedAt: new Date(Date.now() - 3600000 * 96), // 96 hours ago
    expiresAt: new Date(Date.now() - 3600000 * 72), // 72 hours ago
    resolvedAt: new Date(Date.now() - 3600000 * 72), // 72 hours ago
    status: 'RESOLVED',
    isCorrect: true,
    reward: 15.8,
  },
];

interface RecentPredictionsProps {
  showBest?: boolean;
}

export function RecentPredictions({ showBest = false }: RecentPredictionsProps) {
  let predictions = [...mockResolvedPredictions];
  
  // If showing best predictions, filter for correct ones and sort by reward
  if (showBest) {
    predictions = predictions
      .filter(pred => pred.isCorrect)
      .sort((a, b) => (b.reward || 0) - (a.reward || 0));
  } else {
    // Otherwise sort by resolved date (most recent first)
    predictions.sort((a, b) => 
      new Date(b.resolvedAt as Date).getTime() - new Date(a.resolvedAt as Date).getTime()
    );
  }

  return (
    <div>
      {predictions.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-400">
            {showBest 
              ? "Vous n'avez pas encore de prédictions réussies. Continuez d'essayer !" 
              : "Vous n'avez pas encore d'historique de prédictions."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <PredictionCard
              key={prediction.id}
              id={prediction.id!}
              cryptoSymbol={prediction.cryptoSymbol!}
              predictionType={prediction.predictionType!}
              targetValue={prediction.targetValue}
              direction={prediction.direction}
              startPrice={prediction.startPrice!}
              endPrice={prediction.endPrice}
              startedAt={prediction.startedAt!}
              expiresAt={prediction.expiresAt!}
              resolvedAt={prediction.resolvedAt}
              status={prediction.status!}
              isCorrect={prediction.isCorrect}
              reward={prediction.reward}
              onClick={() => alert(`Détails de la prédiction ${prediction.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}