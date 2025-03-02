import { http, createConfig } from 'wagmi';
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

// ID de projet WalletConnect - à remplacer par votre ID
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_WALLET_CONNECT_PROJECT_ID';

// Configuration des chaînes supportées
export const chains = [
  mainnet,    // Ethereum Mainnet
  base,       // Base Mainnet (la blockchain cible pour vos NFTs)
  sepolia,    // Ethereum Testnet
  baseSepolia // Base Testnet
];

// Configuration Wagmi
export const config = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    injected(), // MetaMask, Brave, etc.
    walletConnect({ projectId }), // WalletConnect v2
    coinbaseWallet({ appName: 'CryptoPredict' }) // Coinbase Wallet
  ],
});

// Réseaux pour les environnements dev/prod
export const defaultChain = process.env.NODE_ENV === 'production' ? base : baseSepolia;