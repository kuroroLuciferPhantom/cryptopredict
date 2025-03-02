import { MarketplaceHeader } from '@/components/marketplace/marketplace-header';
import { MarketplaceFilters } from '@/components/marketplace/marketplace-filters';
import { MarketplaceListing } from '@/components/marketplace/marketplace-listing';

export const metadata = {
  title: 'CryptoPredict - Marketplace',
  description: 'Achetez et vendez des cartes de crypto-monnaies',
};

export default function MarketplacePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <MarketplaceHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-1">
          <MarketplaceFilters />
        </div>
        <div className="lg:col-span-3">
          <MarketplaceListing />
        </div>
      </div>
    </div>
  );
}
