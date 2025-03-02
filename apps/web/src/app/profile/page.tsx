export default function ProfilePage() {
  // Données factices pour la démonstration
  const user = {
    name: 'Utilisateur Demo',
    level: 12,
    experience: 3450,
    nextLevelExperience: 4000,
    walletBalance: 2500,
    stats: {
      totalPredictions: 87,
      correctPredictions: 54,
      accuracy: 62.1,
      totalEarnings: 12500,
    },
    cards: [
      { id: 1, name: 'Bitcoin', symbol: 'BTC', rarity: 'epic' },
      { id: 2, name: 'Ethereum', symbol: 'ETH', rarity: 'rare' },
      { id: 3, name: 'Cardano', symbol: 'ADA', rarity: 'common' },
      { id: 4, name: 'Polkadot', symbol: 'DOT', rarity: 'legendary' },
    ],
  };

  const getRarityClasses = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'card-common';
      case 'rare': return 'card-rare';
      case 'epic': return 'card-epic';
      case 'legendary': return 'card-legendary';
      case 'mythic': return 'card-mythic';
      default: return 'card-common';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header du profil */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="mb-2">{user.name}</h1>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm">Niveau {user.level}</span>
              <span className="text-gray-400">Ligue Argent</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 bg-slate-800 p-4 rounded-lg">
            <div className="text-yellow-400 font-bold text-2xl">{user.walletBalance} CP</div>
            <div className="text-sm text-gray-400">Solde de jetons</div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span>Expérience</span>
            <span>{user.experience} / {user.nextLevelExperience}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{ width: `${(user.experience / user.nextLevelExperience) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl font-bold">{user.stats.totalPredictions}</div>
            <div className="text-gray-400">Prédictions totales</div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl font-bold">{user.stats.correctPredictions}</div>
            <div className="text-gray-400">Prédictions correctes</div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl font-bold">{user.stats.accuracy}%</div>
            <div className="text-gray-400">Précision</div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg">
            <div className="text-2xl font-bold">{user.stats.totalEarnings}</div>
            <div className="text-gray-400">Gains totaux</div>
          </div>
        </div>

        {/* Collection de cartes */}
        <h2>Votre collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {user.cards.map(card => (
            <div 
              key={card.id} 
              className={`${getRarityClasses(card.rarity)} bg-slate-800 p-4 rounded-lg hover:scale-105 transition-transform`}
            >
              <div className="text-lg font-semibold">{card.name}</div>
              <div className="text-gray-400">{card.symbol}</div>
              <div className="mt-2 capitalize text-sm">
                Rareté: <span className={card.rarity === 'legendary' ? 'text-orange-400' : 
                  card.rarity === 'epic' ? 'text-purple-400' : 
                  card.rarity === 'rare' ? 'text-blue-400' : 'text-gray-400'
                }>{card.rarity}</span>
              </div>
            </div>
          ))}
          
          <div className="border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center p-8 hover:border-slate-500 transition-colors cursor-pointer">
            <div className="text-center">
              <div className="text-3xl mb-2">+</div>
              <div>Obtenir plus de cartes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
