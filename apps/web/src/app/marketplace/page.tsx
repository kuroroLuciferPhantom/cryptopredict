export default function MarketplacePage() {
  // Cartes factices pour la démo
  const cards = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', rarity: 'rare', price: 500 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', rarity: 'epic', price: 750 },
    { id: 3, name: 'Binance Coin', symbol: 'BNB', rarity: 'common', price: 250 },
    { id: 4, name: 'Cardano', symbol: 'ADA', rarity: 'common', price: 200 },
    { id: 5, name: 'Solana', symbol: 'SOL', rarity: 'legendary', price: 1200 },
    { id: 6, name: 'Ripple', symbol: 'XRP', rarity: 'rare', price: 450 },
  ];

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
      <h1>Marketplace</h1>
      <p>Achetez et vendez des cartes dans la marketplace communautaire.</p>
      
      <div className="mt-8 flex flex-wrap gap-4">
        {/* Filtres */}
        <div className="w-full lg:w-1/4 bg-slate-800 p-4 rounded-lg h-fit">
          <h2>Filtres</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Rareté</label>
              <select className="w-full p-2 bg-slate-700 rounded">
                <option value="">Toutes</option>
                <option value="common">Commune</option>
                <option value="rare">Rare</option>
                <option value="epic">Épique</option>
                <option value="legendary">Légendaire</option>
                <option value="mythic">Mythique</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2">Prix max</label>
              <input type="range" className="w-full" min="0" max="2000" />
              <div className="flex justify-between">
                <span>0</span>
                <span>2000</span>
              </div>
            </div>
            
            <button className="btn-primary w-full mt-4">Appliquer</button>
          </div>
        </div>

        {/* Liste des cartes */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(card => (
            <div key={card.id} className={`card ${getRarityClasses(card.rarity)} hover:scale-105 bg-slate-800 p-4`}>
              <div className="mb-2 text-xl font-semibold">{card.name}</div>
              <div className="text-slate-400 mb-4">{card.symbol}</div>
              
              <div className="flex justify-between items-center">
                <div className="text-yellow-400 font-bold">{card.price} CP</div>
                <button className="btn-primary">Acheter</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
