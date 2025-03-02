export default function GamePage() {
  return (
    <div className="min-h-screen p-8">
      <h1>Modes de jeu</h1>
      <p>Choisissez un mode de jeu pour commencer votre aventure.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-xl shadow-lg">
          <h2>Mode Classique</h2>
          <p className="text-blue-200 mb-4">Prédisez les mouvements de prix des cryptomonnaies et gagnez des récompenses.</p>
          <div className="mt-4">
            <button className="btn-primary">Jouer</button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-xl shadow-lg">
          <h2>Mode Stabilité</h2>
          <p className="text-green-200 mb-4">Prédisez quelles cryptomonnaies resteront les plus stables au cours des prochaines heures.</p>
          <div className="mt-4">
            <button className="btn-primary">Jouer</button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-800 to-orange-800 p-6 rounded-xl shadow-lg">
          <h2>Mode Meme Coins</h2>
          <p className="text-yellow-200 mb-4">Prenez des risques sur les mouvements volatils des meme coins pour des gains potentiels plus élevés.</p>
          <div className="mt-4">
            <button className="btn-primary">Jouer</button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2>Vos prédictions actives</h2>
        <p className="text-gray-400">Vous n'avez pas encore de prédictions actives.</p>
      </div>
    </div>
  );
}
