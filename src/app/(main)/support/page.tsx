'use client';

import { SupportHero } from '@/components/sections/support/hero';
import { SupportFilters } from '@/components/sections/support/filters';
import { SupportList } from '@/components/sections/support/list';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <SupportHero />
      <SupportFilters />
      <SupportList />
    </div>
  );
}