'use client';

import { WagmiProvider } from 'wagmi';
import { config } from '@/config/web3-config';
import { ConnectKitProvider } from 'connectkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            // Personnalisation du thème ConnectKit pour correspondre au style de l'application
            '--ck-font-family': 'Inter, sans-serif',
            '--ck-border-radius': '8px',
            '--ck-overlay-background': 'rgba(0, 0, 0, 0.8)',
            '--ck-body-background': '#1e293b',
            '--ck-body-color': 'white',
            '--ck-primary-button-background': 'linear-gradient(to right, #2563eb, #4f46e5)',
            '--ck-primary-button-hover-background': 'linear-gradient(to right, #1d4ed8, #4338ca)',
          }}
          options={{
            hideBalance: false,
            hideTooltips: false,
            embedGoogleFonts: true,
            walletConnectCTA: 'scan',
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}