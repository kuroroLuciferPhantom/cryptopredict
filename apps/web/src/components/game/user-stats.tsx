'use client';

import { Trophy, CheckCircle, AlertCircle, TrendingUp, BadgeCheck, Wallet, Medal } from 'lucide-react';

// Mock user stats
const mockUserStats = {
  totalPredictions: 24,
  correctPredictions: 15,
  successRate: 62.5,
  totalRewards: 267.8,
  currentStreak: 3,
  bestStreak: 7,
  walletBalance: 540.25,
  leaguePoints: 125,
  league: 'Argent',
  nextLeague: 'Or',
  pointsToNextLeague: 75,
};

export function UserStats() {
  return (
    <div className="space-y-6">
      {/* League status */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-700 rounded-full">
            <Trophy className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <div className="text-sm text-gray-400">Ligue actuelle</div>
            <div className="font-semibold">{mockUserStats.league}</div>
          </div>
        </div>
        <div>
          <div className="text-right text-sm text-gray-400">Prochaine ligue</div>
          <div className="font-semibold text-right">{mockUserStats.nextLeague}</div>
        </div>
      </div>

      {/* Progress bar to next league */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Progression</span>
          <span className="text-blue-400">{mockUserStats.leaguePoints} / {mockUserStats.leaguePoints + mockUserStats.pointsToNextLeague} points</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-blue-600 to-blue-400 h-2.5 rounded-full" 
            style={{ width: `${(mockUserStats.leaguePoints / (mockUserStats.leaguePoints + mockUserStats.pointsToNextLeague)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-400">Précision</span>
          </div>
          <div className="text-xl font-bold">{mockUserStats.successRate}%</div>
          <div className="text-xs text-gray-500 mt-1">{mockUserStats.correctPredictions} sur {mockUserStats.totalPredictions}</div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-400">Série actuelle</span>
          </div>
          <div className="text-xl font-bold">{mockUserStats.currentStreak}</div>
          <div className="text-xs text-gray-500 mt-1">Record: {mockUserStats.bestStreak}</div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <BadgeCheck className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-gray-400">Récompenses</span>
          </div>
          <div className="text-xl font-bold">{mockUserStats.totalRewards.toFixed(1)}</div>
          <div className="text-xs text-gray-500 mt-1">Total gagné</div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Wallet className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-gray-400">Solde</span>
          </div>
          <div className="text-xl font-bold">{mockUserStats.walletBalance.toFixed(1)}</div>
          <div className="text-xs text-gray-500 mt-1">Crédits disponibles</div>
        </div>
      </div>

      {/* Quick tips */}
      <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-blue-400 mb-1">Astuce pour progresser</h4>
            <p className="text-sm text-gray-300">
              Les prédictions sur des durées plus longues (3-7 jours) offrent des récompenses plus importantes. 
              Essayez de diversifier vos prédictions pour maximiser vos gains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}