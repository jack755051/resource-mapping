'use client';

import { ManifestoSection } from '@/components/sections/about/manifesto';
import { ImageGridSection } from '@/components/sections/about/image-grid';
import { PillarsSection } from '@/components/sections/about/pillars';
import { TimelineSection } from '@/components/sections/about/timeline';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ManifestoSection />
      <ImageGridSection />
      <PillarsSection />
      <TimelineSection />
    </div>
  );
}