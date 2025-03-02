"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Wallet } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'email' | 'wallet' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fonction pour se connecter au wallet
  const connectWallet = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Vérifier si window.ethereum est disponible (MetaMask ou autre provider EVM)
      if (typeof window !== 'undefined' && window.ethereum) {
        // Demander l'accès au compte
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Vérifier si l'utilisateur a accordé l'accès
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          // Simuler la connexion
          await new Promise(resolve => setTimeout(resolve, 800));
          router.push('/dashboard');
        } else {
          throw new Error('Veuillez autoriser l\'accès à votre wallet');
        }
      } else {
        throw new Error('Aucun wallet EVM détecté. Veuillez installer MetaMask ou un wallet compatible.');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la connexion au wallet');
    } finally {
      setLoading(false);
    }
  };

  // Gérer la connexion par email
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Ici, vous ajouteriez la logique de connexion par email
      // Pour l'exemple, on simule juste un délai puis une redirection
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Email ou mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header avec retour */}
      <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 w-full">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-slate-200 hover:text-white">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden">
          {!method ? (
            // Choix de la méthode de connexion
            <div className="p-8">
              <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
              
              <div className="space-y-4">
                <button
                  onClick={() => setMethod('email')}
                  className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span>Se connecter avec un email</span>
                </button>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-600"></div>
                  <span className="flex-shrink mx-4 text-slate-400">ou</span>
                  <div className="flex-grow border-t border-slate-600"></div>
                </div>
                
                <button
                  onClick={() => setMethod('wallet')}
                  className="w-full py-3 px-4 bg-indigo-700 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Wallet className="h-5 w-5 mr-3" />
                  <span>Se connecter avec un wallet</span>
                </button>
              </div>
              
              <div className="mt-8 text-center text-sm text-slate-400">
                Vous n'avez pas de compte? <Link href="/register" className="text-blue-400 hover:text-blue-300">Inscription</Link>
              </div>
            </div>
          ) : method === 'email' ? (
            // Formulaire de connexion par email
            <div className="p-8">
              <h1 className="text-2xl font-bold text-center mb-6">Connexion avec email</h1>
              
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="flex justify-end mt-1">
                    <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                      Mot de passe oublié?
                    </Link>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-70"
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>
              
              <button
                onClick={() => setMethod(null)}
                className="mt-6 text-slate-400 hover:text-slate-300 text-sm flex items-center mx-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </button>
            </div>
          ) : (
            // Connexion par wallet
            <div className="p-8">
              <h1 className="text-2xl font-bold text-center mb-6">Connexion avec wallet</h1>
              
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <p className="text-slate-300 text-sm mb-4">
                  Connectez-vous avec MetaMask ou tout autre wallet compatible EVM pour continuer.
                </p>
                
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center disabled:opacity-70"
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  {loading ? 'Connexion...' : 'Connecter mon wallet'}
                </button>
                
                {walletAddress && (
                  <div className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg break-all">
                    <div className="text-xs text-green-200 font-medium mb-1">Wallet connecté:</div>
                    <div className="text-sm">{walletAddress}</div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setMethod(null)}
                className="mt-6 text-slate-400 hover:text-slate-300 text-sm flex items-center mx-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer simple */}
      <footer className="bg-slate-900 py-4 px-4 text-center text-sm text-slate-500">
        &copy; 2025 CryptoPredict. Tous droits réservés.
      </footer>
    </div>
  );
}