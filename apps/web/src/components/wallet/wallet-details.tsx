'use client';

import { useAccount, useBalance, useChainId, useDisconnect } from 'wagmi';
import { chains } from '@/config/web3-config';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, ExternalLink } from 'lucide-react';

export function WalletDetails() {
  const { address, connector } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  
  const currentChain = chains.find(chain => chain.id === chainId);
  const explorerUrl = address && currentChain?.blockExplorers?.default
    ? `${currentChain.blockExplorers.default.url}/address/${address}`
    : null;

  if (!address) {
    return null;
  }

  return (
    <Card className="w-full bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Wallet Connecté</CardTitle>
        <CardDescription className="text-slate-400">
          Connecté via {connector?.name || 'Unknown'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-slate-400">Adresse</p>
          <p className="text-sm font-mono text-white break-all">{address}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-slate-400">Réseau</p>
          <p className="text-sm text-white">{currentChain?.name || 'Réseau Inconnu'}</p>
        </div>

        {balance && (
          <div className="space-y-1">
            <p className="text-sm text-slate-400">Balance</p>
            <p className="text-sm text-white">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t border-slate-700 pt-4">
        <Button
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
          onClick={() => disconnect()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnecter
        </Button>

        {explorerUrl && (
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => window.open(explorerUrl, '_blank')}
          >
            Explorer
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}