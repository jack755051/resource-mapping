'use client';

import { ClientSection } from '@/components/sections/home/client-logos';
import { CapabilitySection } from '@/components/sections/home/capabilities';
import { CtaSection } from '@/components/sections/home/cta';
import { HeroSection } from '@/components/sections/home/hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeroSection />
      <ClientSection />
      <CapabilitySection />
      <CtaSection />
    </div>
  );
}