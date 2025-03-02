'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import { WalletBadge } from './wallet-badge';

export function ConnectButton() {
  const { isConnected } = useAccount();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <button
            onClick={show}
            className={`px-4 py-2 rounded-md font-medium transition-all shadow-lg ${
              isConnected
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/20'
            }`}
          >
            {isConnected ? (
              <WalletBadge address={truncatedAddress} ensName={ensName} />
            ) : (
              'Connecter Wallet'
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}