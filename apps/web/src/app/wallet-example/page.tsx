'use client';

import { ConnectButton } from '@/components/wallet/connect-button';
import { WalletDetails } from '@/components/wallet/wallet-details';
import { useWallet } from '@/hooks/useWallet';

export default function WalletExamplePage() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Exemple d'intégration Wallet</h1>
        
        <div className="flex flex-col gap-8">
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
            <h2 className="text-xl font-medium mb-4">Connexion au wallet</h2>
            <p className="text-slate-300 mb-6">
              Cliquez sur le bouton ci-dessous pour connecter votre wallet Ethereum (MetaMask, WalletConnect, etc.)
            </p>
            <ConnectButton />
          </div>

          {isConnected ? (
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
              <h2 className="text-xl font-medium mb-4">Détails du wallet</h2>
              <WalletDetails />
            </div>
          ) : (
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 text-center">
              <p className="text-slate-400">Connectez votre wallet pour voir les détails</p>
            </div>
          )}

          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
            <h2 className="text-xl font-medium mb-4">Comment intégrer</h2>
            <div className="prose prose-invert max-w-none">
              <p>Pour intégrer la connexion wallet dans vos propres pages:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>S'assurer que <code>Web3Provider</code> est ajouté dans le layout principal</li>
                <li>Importer le composant <code>ConnectButton</code> dans votre page</li>
                <li>Utiliser le hook <code>useWallet</code> pour accéder aux informations du wallet</li>
              </ol>
              
              <p className="mt-4">Exemple de code:</p>
              <pre className="bg-slate-900 p-4 rounded text-sm overflow-x-auto">
                {`import { ConnectButton } from '@/components/wallet/connect-button';
import { useWallet } from '@/hooks/useWallet';

export default function MaPage() {
  const { address, isConnected, balance } = useWallet();
  
  return (
    <div>
      <ConnectButton />
      
      {isConnected && (
        <div>
          <p>Adresse: {address}</p>
          <p>Balance: {balance?.formatted} {balance?.symbol}</p>
        </div>
      )}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}