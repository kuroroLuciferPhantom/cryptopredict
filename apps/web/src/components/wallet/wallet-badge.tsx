'use client';

import { Wallet } from 'lucide-react';

interface WalletBadgeProps {
  address?: string;
  ensName?: string | null;
}

export function WalletBadge({ address, ensName }: WalletBadgeProps) {
  const displayText = ensName || address || '0x...';

  return (
    <div className="flex items-center gap-2">
      <Wallet className="h-4 w-4" />
      <span>{displayText}</span>
    </div>
  );
}