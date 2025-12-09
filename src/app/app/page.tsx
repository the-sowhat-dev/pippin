'use client';

import BrandsListStrategy from '@/components/strategies/BrandsListStrategy';
import SocialsStrategy from '@/components/strategies/SocialsStrategy';
import WelcomeStrategy from '@/components/strategies/WelcomeStrategy';
import PrinciplesStrategy from '@/components/strategies/PrinciplesStrategy';
import DescriptionStrategy from '@/components/strategies/DescriptionStrategy';
import QandAStrategy from '@/components/strategies/QandAStrategy';

export default function Page() {
  return (
    <main className={`bg-gradient-to-b from-[#35C055] to-[#C6F0D0]`}>
      <WelcomeStrategy />

      <DescriptionStrategy />

      <BrandsListStrategy />

      <PrinciplesStrategy />

      <QandAStrategy />

      <SocialsStrategy />
    </main>
  );
}
