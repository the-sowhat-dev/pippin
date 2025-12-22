'use client';

import { HeroPro } from '@/components/HeroPro';
import ActionsStrategy from '@/components/strategies/ActionsStrategy';
import SocialsProStrategy from '@/components/strategies/SocialsProStrategy';
import TribuneProStrategy from '@/components/strategies/TribuneProStrategy';
import DescriptionProStrategy from '@/components/strategies/DescriptionProStrategy';

export default function Page() {
  return (
    <main className="min-h-screen text-[#203649] bg-gray-100 pb-12 sm:pb-24">
      <HeroPro />

      <DescriptionProStrategy />

      <ActionsStrategy />

      <TribuneProStrategy />

      <SocialsProStrategy />
    </main>
  );
}
