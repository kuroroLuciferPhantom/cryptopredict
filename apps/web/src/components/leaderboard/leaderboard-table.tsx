'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge, MoreHorizontal, Trophy, ArrowUp, ArrowDown } from 'lucide-react';

// Mock leaderboard data
const mockLeaderboardData = [
  {
    id: 'user1',
    rank: 1,
    name: 'CryptoKing',
    image: '/api/placeholder/48/48',
    league: 'Diamant',
    experience: 7890,
    predictions: 87,
    successRate: 78.5,
    rewards: 3450.8,
    rankChange: 0,
  },
  {
    id: 'user2',
    rank: 2,
    name: 'BitcoinBaron',
    image: '/api/placeholder/48/48',
    league: 'Diamant',
    experience: 6540,
    predictions: 75,
    successRate: 72.0,
    rewards: 2980.5,
    rankChange: 1,
  },
  {
    id: 'user3',
    rank: 3,
    name: 'CryptoQueen',
    image: '/api/placeholder/48/48',
    league: 'Diamant',
    experience: 5980,
    predictions: 68,
    successRate: 75.1,
    rewards: 2750.2,
    rankChange: -1,
  },
  {
    id: 'user4',
    rank: 4,
    name: 'ETHMaster',
    image: '/api/placeholder/48/48',
    league: 'Or',
    experience: 4870,
    predictions: 62,
    successRate: 68.7,
    rewards: 2120.5,
    rankChange: 2,
  },
  {
    id: 'user5',
    rank: 5,
    name: 'AltcoinHunter',
    image: '/api/placeholder/48/48',
    league: 'Or',
    experience: 4350,
    predictions: 58,
    successRate: 65.3,
    rewards: 1950.7,
    rankChange: 0,
  },
  {
    id: 'user6',
    rank: 6,
    name: 'TokenTrader',
    image: '/api/placeholder/48/48',
    league: 'Or',
    experience: 3920,
    predictions: 52,
    successRate: 63.8,
    rewards: 1740.3,
    rankChange: -2,
  },
  {
    id: 'user7',
    rank: 7,
    name: 'SatoshiFan',
    image: '/api/placeholder/48/48',
    league: 'Or',
    experience: 3550,
    predictions: 48,
    successRate: 64.2,
    rewards: 1580.5,
    rankChange: 1,
  },
  {
    id: 'user8',
    rank: 8,
    name: 'CryptoPredictor',
    image: '/api/placeholder/48/48', // Current user
    isCurrentUser: true,
    league: 'Argent',
    experience: 1250,
    predictions: 24,
    successRate: 62.5,
    rewards: 540.25,
    rankChange: 3,
  },
  {
    id: 'user9',
    rank: 9,
    name: 'BlockchainBuddy',
    image: '/api/placeholder/48/48',
    league: 'Argent',
    experience: 980,
    predictions: 20,
    successRate: 60.0,
    rewards: 420.8,
    rankChange: -1,
  },
  {
    id: 'user10',
    rank: 10,
    name: 'DogeEnthusiast',
    image: '/api/placeholder/48/48',
    league: 'Argent',
    experience: 780,
    predictions: 18,
    successRate: 55.6,
    rewards: 350.2,
    rankChange: 0,
  },
];

export function LeaderboardTable() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const displayedData = mockLeaderboardData.slice(0, pageSize);

  // League badge styling
  const getLeagueBadge = (league: string) => {
    switch (league) {
      case 'Bronze':
        return { color: 'bg-gray-500', textColor: 'text-gray-500' };
      case 'Argent':
        return { color: 'bg-gray-300', textColor: 'text-gray-300' };
      case 'Or':
        return { color: 'bg-yellow-500', textColor: 'text-yellow-500' };
      case 'Diamant':
        return { color: 'bg-blue-500', textColor: 'text-blue-500' };
      default:
        return { color: 'bg-gray-500', textColor: 'text-gray-500' };
    }
  };

  // Rank change indicator
  const getRankChangeIndicator = (change: number) => {
    if (change === 0) {
      return <span className="text-gray-500 text-xs">-</span>;
    } else if (change > 0) {
      return (
        <div className="flex items-center text-green-500 text-xs">
          <ArrowUp className="h-3 w-3 mr-0.5" />
          <span>{change}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-red-500 text-xs">
          <ArrowDown className="h-3 w-3 mr-0.5" />
          <span>{Math.abs(change)}</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/70 border-b border-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 w-16">Rang</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Joueur</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 hidden md:table-cell">Ligue</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">XP</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300 hidden lg:table-cell">Précision</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300 hidden md:table-cell">Récompenses</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300 w-16">Δ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {displayedData.map((player) => (
              <tr key={player.id} className={`${player.isCurrentUser ? 'bg-blue-900/20' : 'hover:bg-gray-800/30'} transition-colors`}>
                <td className="px-4 py-4 whitespace-nowrap">
                  {player.rank <= 3 ? (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 text-white font-bold">
                      {player.rank}
                    </div>
                  ) : (
                    <div className="text-center text-gray-300 font-medium">{player.rank}</div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        src={player.image}
                        alt={player.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      {player.isCurrentUser && (
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-white">{player.name}</div>
                      <div className="text-sm text-gray-400">{player.predictions} prédictions</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${getLeagueBadge(player.league).color} mr-2`}></div>
                    <span className={`text-sm ${getLeagueBadge(player.league).textColor}`}>
                      {player.league}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right font-semibold">
                  {player.experience.toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right hidden lg:table-cell">
                  {player.successRate.toFixed(1)}%
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right hidden md:table-cell">
                  {player.rewards.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  {getRankChangeIndicator(player.rankChange)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-gray-800">
        <div className="flex items-center text-sm text-gray-400">
          Affichage de <span className="font-medium text-white mx-1">{displayedData.length}</span> sur <span className="font-medium text-white mx-1">{mockLeaderboardData.length}</span> joueurs
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-sm" disabled={currentPage === 1}>
            Précédent
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-sm" disabled={displayedData.length < pageSize}>
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
