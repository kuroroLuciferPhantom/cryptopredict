"use client";

import { useState } from 'react';
import { Wallet } from 'lucide-react';

interface WalletConnectButtonProps {
  onConnect?: (address: string) => void;
  onError?: (error: Error) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function WalletConnectButton({
  onConnect,
  onError,
  variant = 'primary',
  className = '',
}: WalletConnectButtonProps) {
  const [loading, setLoading] = useState(false);
  
  const getButtonStyle = () => {
    const baseStyle = 'flex items-center justify-center py-2 px-4 rounded-md font-medium transition-all';
    
    if (variant === 'primary') {
      return `${baseStyle} bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white ${className}`;
    }
    
    return `${baseStyle} bg-slate-700 hover:bg-slate-600 text-white ${className}`;
  };
  
  const connectWallet = async () => {
    setLoading(true);
    
    try {
      // Vérifier si window.ethereum est disponible
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('Aucun wallet EVM détecté. Veuillez installer MetaMask ou un wallet compatible.');
      }
      
      // Demander l'accès au compte
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Vérifier si l'utilisateur a accordé l'accès
      if (!accounts || accounts.length === 0) {
        throw new Error('Veuillez autoriser l\'accès à votre wallet.');
      }
      
      const address = accounts[0];
      
      // Vérifier si nous sommes sur Base (ID de chaîne 8453 pour Base mainnet, 84531 pour Base testnet)
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      // Si on veut forcer Base, décommenter ce code:
      /*
      // Base testnet
      if (chainId !== '0x14a33') { // 84531 en hexadécimal
        try {
          // Tenter de changer de réseau
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x14a33' }],
          });
        } catch (switchError: any) {
          // Si le réseau n'est pas configuré, on propose de l'ajouter
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x14a33',
                  chainName: 'Base Goerli Testnet',
                  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                  rpcUrls: ['https://goerli.base.org'],
                  blockExplorerUrls: ['https://goerli.basescan.org'],
                }],
              });
            } catch (addError) {
              throw new Error('Erreur lors de l\'ajout du réseau Base. Veuillez l\'ajouter manuellement.');
            }
          } else {
            throw switchError;
          }
        }
      }
      */
      
      // Notifier le parent avec l'adresse
      onConnect?.(address);
      
    } catch (error: any) {
      console.error('Erreur de connexion wallet:', error);
      onError?.(error instanceof Error ? error : new Error(error.message || 'Erreur inconnue'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <button 
      onClick={connectWallet}
      disabled={loading}
      className={getButtonStyle()}
      type="button"
    >
      <Wallet className="h-5 w-5 mr-2" />
      {loading ? 'Connexion...' : 'Connecter wallet'}
    </button>
  );
}
