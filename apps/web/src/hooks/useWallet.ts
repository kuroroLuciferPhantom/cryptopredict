'use client';

import { useAccount, useBalance, useChainId, useDisconnect, useSwitchChain } from 'wagmi';
import { defaultChain } from '@/config/web3-config';

export function useWallet() {
  const { address, isConnected, connector } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const isOnCorrectChain = chainId === defaultChain.id;

  const switchToDefaultChain = () => {
    if (!isOnCorrectChain) {
      switchChain({ chainId: defaultChain.id });
    }
  };

  return {
    address,
    isConnected,
    balance,
    chainId,
    connector,
    disconnect,
    isOnCorrectChain,
    switchToDefaultChain,
  };
}