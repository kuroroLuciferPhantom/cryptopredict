"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, BarChart2, Briefcase, LogOut, TrendingUp, User, Wallet } from 'lucide-react';

export default function Dashboard() {
  const [username, setUsername] = useState('JoueurCrypto');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  
  // Simuler une connexion au wallet si l'utilisateur s'est connecté précédemment avec un wallet
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletConnected(true);
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error('Failed to get wallet accounts', error);
        }
      }
    };
    
    checkWalletConnection();
  }, []);
  
  // Données factices pour la démonstration
  const userStats = {
    experience: 1250,
    level: 8,
    nextLevelExp: 1500,
    walletBalance: 450,
    totalPredictions: 24,
    correctPredictions: 15,
    accuracy: 62.5,
  };
  
  const recentPredictions = [
    { id: 1, crypto: 'Bitcoin', type: 'Hausse', result: 'correct', reward: 75, date: '28 Feb 2025' },
    { id: 2, crypto: 'Ethereum', type: 'Baisse', result: 'incorrect', reward: 0, date: '27 Feb 2025' },
    { id: 3, crypto: 'Solana', type: 'Stabilité', result: 'correct', reward: 120, date: '26 Feb 2025' },
  ];
  
  const topCards = [
    { id: 1, name: 'Bitcoin Satoshi', rarity: 'legendary', usageCount: 8 },
    { id: 2, name: 'Ethereum Vitalik', rarity: 'epic', usageCount: 12 },
    { id: 3, name: 'Solana', rarity: 'rare', usageCount: 5 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      {/* Sidebar / Navigation */}
      <div className="flex">
        <aside className="w-64 fixed left-0 top-0 bottom-0 bg-slate-800 border-r border-slate-700 hidden md:block">
          <div className="p-4 border-b border-slate-700">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              CryptoPredict
            </h1>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard" className="flex items-center p-2 bg-slate-700 rounded-md">
                  <BarChart2 className="h-5 w-5 mr-3 text-blue-400" />
                  <span>Tableau de bord</span>
                </Link>
              </li>
              <li>
                <Link href="/game" className="flex items-center p-2 hover:bg-slate-700 rounded-md text-slate-300 hover:text-white">
                  <TrendingUp className="h-5 w-5 mr-3 text-green-400" />
                  <span>Jouer</span>
                </Link>
              </li>
              <li>
                <Link href="/collection" className="flex items-center p-2 hover:bg-slate-700 rounded-md text-slate-300 hover:text-white">
                  <Briefcase className="h-5 w-5 mr-3 text-purple-400" />
                  <span>Ma collection</span>
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="flex items-center p-2 hover:bg-slate-700 rounded-md text-slate-300 hover:text-white">
                  <Wallet className="h-5 w-5 mr-3 text-amber-400" />
                  <span>Marketplace</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="flex items-center p-2 hover:bg-slate-700 rounded-md text-slate-300 hover:text-white">
                  <User className="h-5 w-5 mr-3 text-indigo-400" />
                  <span>Profil</span>
                </Link>
              </li>
            </ul>
            
            <div className="pt-8 mt-8 border-t border-slate-700">
              <Link href="/" className="flex items-center p-2 hover:bg-slate-700 rounded-md text-slate-300 hover:text-white">
                <LogOut className="h-5 w-5 mr-3 text-red-400" />
                <span>Déconnexion</span>
              </Link>
            </div>
          </nav>
        </aside>
        
        {/* Main Content */}
        <div className="md:ml-64 flex-1">
          <header className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-xl font-semibold">Tableau de bord</h2>
            
            <div className="flex items-center">
              {walletConnected && (
                <div className="hidden sm:flex items-center mr-4 text-sm bg-slate-700 rounded-md px-3 py-1">
                  <Wallet className="h-4 w-4 mr-2 text-amber-400" />
                  <span className="text-slate-300 hidden md:inline">Wallet:</span>
                  <span className="truncate ml-1 max-w-[120px]">{`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}</span>
                </div>
              )}
              
              <div className="flex items-center bg-slate-700 rounded-md px-3 py-1">
                <User className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-sm">{username}</span>
              </div>
            </div>
          </header>
          
          <main className="p-4 md:p-6">
            {/* User Stats Overview */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Level Progress */}
                <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-sm text-slate-400 mb-2">Niveau</h3>
                  <div className="text-2xl font-bold">{userStats.level}</div>
                  <div className="mt-2">
                    <div className="flex justify-between mb-1 text-xs">
                      <span>{userStats.experience} XP</span>
                      <span>{userStats.nextLevelExp} XP</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        style={{ width: `${(userStats.experience / userStats.nextLevelExp) * 100}%` }}
                        className="bg-blue-500 h-2 rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Wallet Balance */}
                <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-sm text-slate-400 mb-2">Solde</h3>
                  <div className="text-2xl font-bold text-yellow-400">
                    {userStats.walletBalance} <span className="text-sm">CP</span>
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    Jetons CryptoPredict disponibles pour acheter des cartes
                  </div>
                </div>
                
                {/* Predictions */}
                <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
                  <h3 className="text-sm text-slate-400 mb-2">Prédictions</h3>
                  <div className="text-2xl font-bold">{userStats.totalPredictions}</div>
                  <div className="mt-3 text-xs flex justify-between">
                    <span className="text-green-400">{userStats.correctPredictions} réussies</span>
                    <span className="text-slate-400">Précision: {userStats.accuracy}%</span>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="bg-slate-800 p-4 rounded-lg shadow-lg flex flex-col">
                  <h3 className="text-sm text-slate-400 mb-3">Actions rapides</h3>
                  <Link href="/game" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 text-center text-sm mb-2">
                    Nouvelle prédiction
                  </Link>
                  <Link href="/marketplace" className="bg-slate-700 hover:bg-slate-600 text-white rounded-md py-2 px-4 text-center text-sm">
                    Explorer le marché
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Recent Predictions */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Prédictions récentes</h2>
                <Link href="/predictions" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                  Voir tout
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-700">
                        <th className="text-left p-4">Crypto</th>
                        <th className="text-left p-4">Type</th>
                        <th className="text-left p-4">Résultat</th>
                        <th className="text-left p-4">Récompense</th>
                        <th className="text-left p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPredictions.map(prediction => (
                        <tr key={prediction.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                          <td className="p-4">{prediction.crypto}</td>
                          <td className="p-4">{prediction.type}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-md text-xs ${prediction.result === 'correct' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {prediction.result === 'correct' ? 'Réussi' : 'Manqué'}
                            </span>
                          </td>
                          <td className="p-4">
                            {prediction.reward > 0 ? (
                              <span className="text-yellow-400">{prediction.reward} CP</span>
                            ) : (
                              <span className="text-slate-500">0 CP</span>
                            )}
                          </td>
                          <td className="p-4 text-slate-400">{prediction.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Top Cards Used */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Cartes les plus utilisées</h2>
                <Link href="/collection" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                  Voir ma collection
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topCards.map(card => {
                  const rarityClasses = {
                    common: 'border-gray-400',
                    rare: 'border-blue-400',
                    epic: 'border-purple-400',
                    legendary: 'border-orange-400',
                    mythic: 'border-red-400'
                  };
                  
                  return (
                    <div 
                      key={card.id}
                      className={`bg-slate-800 rounded-lg border-2 ${rarityClasses[card.rarity]} p-4 hover:transform hover:scale-105 transition-transform`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{card.name}</h3>
                        <span className="capitalize text-xs px-2 py-1 rounded bg-slate-700">{card.rarity}</span>
                      </div>
                      <div className="mt-4 text-sm text-slate-400">
                        Utilisée {card.usageCount} fois cette semaine
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
