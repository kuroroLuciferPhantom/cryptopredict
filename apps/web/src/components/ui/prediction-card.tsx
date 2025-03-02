'use client';

import { ArrowUpRight, ArrowDownRight, Clock, Check, X, AlertTriangle, BadgeCheck } from 'lucide-react';
import { CryptoIcon } from './crypto-icon';

export type PredictionType = 'PRICE_TARGET' | 'PERCENTAGE_CHANGE' | 'DIRECTION' | 'STABILITY';
export type PredictionStatus = 'ACTIVE' | 'RESOLVED' | 'EXPIRED' | 'CANCELED';
export type PredictionDirection = 'UP' | 'DOWN' | 'STABLE';

export interface PredictionCardProps {
  id: string;
  cryptoSymbol: string;
  predictionType: PredictionType;
  targetValue?: number;
  direction?: PredictionDirection;
  startPrice: number;
  currentPrice?: number;
  endPrice?: number;
  startedAt: Date | string;
  expiresAt: Date | string;
  resolvedAt?: Date | string;
  status: PredictionStatus;
  isCorrect?: boolean;
  reward?: number;
  onClick?: () => void;
  className?: string;
}

export function PredictionCard({
  id,
  cryptoSymbol,
  predictionType,
  targetValue,
  direction,
  startPrice,
  currentPrice,
  endPrice,
  startedAt,
  expiresAt,
  resolvedAt,
  status,
  isCorrect,
  reward,
  onClick,
  className = '',
}: PredictionCardProps) {
  // Format dates
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleString();
  };

  // Calculate time remaining for active predictions
  const calculateTimeRemaining = () => {
    if (status !== 'ACTIVE') return '';
    
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'En attente de résolution';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m restantes`;
  };

  // Generate prediction description
  const getPredictionDescription = () => {
    switch (predictionType) {
      case 'PRICE_TARGET':
        return `Le prix atteindra $${targetValue?.toFixed(2)}`;
      case 'PERCENTAGE_CHANGE':
        return `Le prix changera de ${targetValue}%`;
      case 'DIRECTION':
        return direction === 'UP' ? 'Le prix augmentera' : 
               direction === 'DOWN' ? 'Le prix diminuera' : 
               'Le prix restera stable';
      case 'STABILITY':
        return `Le prix restera dans une plage de ${targetValue}%`;
      default:
        return 'Prédiction';
    }
  };

  // Status badge styles and icons
  const statusConfig = {
    ACTIVE: {
      className: 'bg-blue-500/20 text-blue-400',
      icon: <Clock size={14} />,
      text: 'Active',
    },
    RESOLVED: {
      className: `${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`,
      icon: isCorrect ? <Check size={14} /> : <X size={14} />,
      text: isCorrect ? 'Correcte' : 'Incorrecte',
    },
    EXPIRED: {
      className: 'bg-yellow-500/20 text-yellow-400',
      icon: <AlertTriangle size={14} />,
      text: 'Expirée',
    },
    CANCELED: {
      className: 'bg-gray-500/20 text-gray-400',
      icon: <X size={14} />,
      text: 'Annulée',
    },
  };

  // Calculate price change from start to current/end
  const calculatePriceChange = () => {
    const comparePrice = status === 'ACTIVE' ? (currentPrice || startPrice) : (endPrice || startPrice);
    const change = ((comparePrice - startPrice) / startPrice) * 100;
    return change;
  };

  const priceChange = calculatePriceChange();
  const timeRemaining = calculateTimeRemaining();

  return (
    <div 
      className={`bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-xl overflow-hidden transition-all cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CryptoIcon symbol={cryptoSymbol} size={24} withBackground />
          <span className="font-semibold">{cryptoSymbol}</span>
        </div>
        <div className={`flex items-center px-2 py-1 rounded-full text-xs ${statusConfig[status].className}`}>
          {statusConfig[status].icon}
          <span className="ml-1">{statusConfig[status].text}</span>
        </div>
      </div>

      {/* Prediction info */}
      <div className="p-4 space-y-3">
        <div>
          <div className="text-sm text-gray-400">Prédiction</div>
          <div className="font-medium flex items-center mt-1">
            {direction === 'UP' && <ArrowUpRight size={16} className="text-green-500 mr-1" />}
            {direction === 'DOWN' && <ArrowDownRight size={16} className="text-red-500 mr-1" />}
            {getPredictionDescription()}
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <div className="text-sm text-gray-400">Prix de départ</div>
            <div className="font-medium">${startPrice.toFixed(2)}</div>
          </div>
          {(endPrice !== undefined && status !== 'ACTIVE') && (
            <div>
              <div className="text-sm text-gray-400">Prix final</div>
              <div className="font-medium">${endPrice.toFixed(2)}</div>
            </div>
          )}
          {(currentPrice !== undefined && status === 'ACTIVE') && (
            <div>
              <div className="text-sm text-gray-400">Prix actuel</div>
              <div className="font-medium">${currentPrice.toFixed(2)}</div>
            </div>
          )}
        </div>

        {/* Price change indicator */}
        <div className="flex items-center">
          <div className={`flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span className="ml-1">{Math.abs(priceChange).toFixed(2)}%</span>
          </div>
        </div>

        {/* Timeframe */}
        <div className="flex justify-between text-sm text-gray-400">
          <div>Début: {formatDate(startedAt)}</div>
          <div>Fin: {formatDate(expiresAt)}</div>
        </div>

        {/* Reward if applicable */}
        {reward !== undefined && status === 'RESOLVED' && isCorrect && (
          <div className="mt-2 flex items-center text-green-400">
            <BadgeCheck size={16} className="mr-1" />
            <span>Récompense: {reward.toFixed(2)} crédits</span>
          </div>
        )}

        {/* Time remaining for active predictions */}
        {status === 'ACTIVE' && timeRemaining && (
          <div className="text-sm text-blue-400 flex items-center mt-2">
            <Clock size={14} className="mr-1" />
            <span>{timeRemaining}</span>
          </div>
        )}
      </div>
    </div>
  );
}
