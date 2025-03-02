"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Wallet } from 'lucide-react';
import { ConnectKitButton } from 'connectkit';
import { useWallet } from '@/hooks/useWallet';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Choix du type d'inscription, 2: Form email/wallet, 3: Choix du pseudo
  const [method, setMethod] = useState<'email' | 'wallet' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Utilisation du hook useWallet pour accéder aux informations du wallet
  const { address: walletAddress, isConnected } = useWallet();

  // Effet pour passer à l'étape 3 lorsque le wallet est connecté
  useEffect(() => {
    if (method === 'wallet' && isConnected && walletAddress) {
      setStep(3);
    }
  }, [method, isConnected, walletAddress]);

  // Gérer l'inscription par email
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Ici, vous ajouteriez la logique d'inscription par email
      // Pour l'exemple, on simule juste un délai puis on passe à l'étape suivante
      await new Promise(resolve => setTimeout(resolve, 800));
      setStep(3);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  // Finaliser l'inscription avec le pseudo
  const finishRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Logique pour vérifier et enregistrer le pseudo
      // Pour l'exemple, on simule un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En fonction de la méthode utilisée, on a soit un email/password soit une adresse de wallet
      const userData = method === 'email' 
        ? { email, password, username } 
        : { walletAddress, username };
      
      console.log('Inscription réussie avec les données:', userData);
      
      // Redirection vers la page d'accueil ou le tableau de bord
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la finalisation de l\'inscription');
    } finally {
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
          {/* Étape 1: Choix du type d'inscription */}
          {step === 1 && (
            <div className="p-8">
              <h1 className="text-2xl font-bold text-center mb-6">Rejoindre CryptoPredict</h1>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setMethod('email');
                    setStep(2);
                  }}
                  className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span>S'inscrire avec un email</span>
                </button>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-600"></div>
                  <span className="flex-shrink mx-4 text-slate-400">ou</span>
                  <div className="flex-grow border-t border-slate-600"></div>
                </div>
                
                <button
                  onClick={() => {
                    setMethod('wallet');
                    setStep(2);
                  }}
                  className="w-full py-3 px-4 bg-indigo-700 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Wallet className="h-5 w-5 mr-3" />
                  <span>Se connecter avec un wallet</span>
                </button>
              </div>
              
              <div className="mt-8 text-center text-sm text-slate-400">
                Vous avez déjà un compte? <Link href="/login" className="text-blue-400 hover:text-blue-300">Connexion</Link>
              </div>
            </div>
          )}
          
          {/* Étape 2: Formulaire selon méthode choisie */}
          {step === 2 && (
            <div className="p-8">
              <h1 className="text-2xl font-bold text-center mb-6">
                {method === 'email' ? 'Inscription avec email' : 'Connexion au wallet'}
              </h1>
              
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}
              
              {method === 'email' ? (
                <form onSubmit={handleEmailSignup} className="space-y-4">
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
                      minLength={8}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-70"
                  >
                    {loading ? 'Chargement...' : 'Continuer'}
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <p className="text-slate-300 text-sm mb-4">
                    Connectez-vous avec votre wallet préféré pour créer un compte. Nous prenons en charge MetaMask, WalletConnect, Coinbase Wallet et plus encore.
                  </p>
                  
                  {/* Intégration du composant ConnectKit */}
                  <div className="flex justify-center mb-4">
                    <ConnectKitButton theme="midnight" customTheme={{
                      "--ck-font-family": "Inter, sans-serif",
                      "--ck-border-radius": "8px",
                      "--ck-overlay-background": "rgba(0, 0, 0, 0.8)",
                      "--ck-body-background": "#1e293b",
                      "--ck-body-color": "white",
                      "--ck-primary-button-background": "linear-gradient(to right, #2563eb, #4f46e5)",
                      "--ck-primary-button-hover-background": "linear-gradient(to right, #1d4ed8, #4338ca)",
                    }} />
                  </div>
                  
                  {isConnected && walletAddress && (
                    <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg break-all">
                      <div className="text-xs text-green-200 font-medium mb-1">Wallet connecté:</div>
                      <div className="text-sm">{walletAddress}</div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-400 mb-2">Wallets supportés :</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <div className="px-3 py-1 bg-slate-700 rounded-full text-xs">MetaMask</div>
                      <div className="px-3 py-1 bg-slate-700 rounded-full text-xs">WalletConnect</div>
                      <div className="px-3 py-1 bg-slate-700 rounded-full text-xs">Coinbase Wallet</div>
                      <div className="px-3 py-1 bg-slate-700 rounded-full text-xs">Rainbow</div>
                      <div className="px-3 py-1 bg-slate-700 rounded-full text-xs">Trust Wallet</div>
                    </div>
                  </div>

                </div>
              )}
              
              <button
                onClick={() => setStep(1)}
                className="mt-6 text-slate-400 hover:text-slate-300 text-sm flex items-center mx-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </button>
            </div>
          )}
          
          {/* Étape 3: Choix du pseudo */}
          {step === 3 && (
            <div className="p-8">
              <h1 className="text-2xl font-bold text-center mb-6">Choisissez votre pseudo</h1>
              
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={finishRegistration} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">Pseudo</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Choisissez un pseudo unique"
                    required
                    minLength={3}
                    maxLength={20}
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    3-20 caractères, lettres et chiffres uniquement
                  </p>
                </div>
                
                <div className="bg-slate-700/50 p-3 rounded-lg mt-4">
                  <h3 className="text-sm font-medium mb-2">Méthode d'inscription choisie:</h3>
                  <div className="text-sm">
                    {method === 'email' ? (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <span>{email}</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Wallet className="h-5 w-5 mr-2 text-orange-400" />
                        <span className="truncate">{walletAddress}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !username.trim()}
                  className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-70"
                >
                  {loading ? 'Finalisation...' : 'Terminer l\'inscription'}
                </button>
              </form>
              
              <button
                onClick={() => setStep(2)}
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