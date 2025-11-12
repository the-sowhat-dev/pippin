'use client';

import BrandsListStrategy from '@/components/strategies/BrandsListStrategy';
import SocialsStrategy from '@/components/strategies/SocialsStrategy';
import WelcomeStrategy from '@/components/strategies/WelcomeStrategy';
import PrinciplesStrategy from '@/components/strategies/PrinciplesStrategy';
import DescriptionStrategy from '@/components/strategies/DescriptionStrategy';

export default function Page() {
  return (
    <main className={`bg-gradient-to-b from-yellow-200 to-yellow-50`}>
      <WelcomeStrategy />

      <DescriptionStrategy />

      <PrinciplesStrategy />

      <BrandsListStrategy />

      <SocialsStrategy />
    </main>
  );
}
