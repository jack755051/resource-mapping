'use client';

import { SolutionsHero } from '@/components/sections/solutions/hero';
import { SolutionsProcessSteps } from '@/components/sections/solutions/process-steps';
import { SolutionsQuality } from '@/components/sections/solutions/quality';
import { SolutionsCTA } from '@/components/sections/solutions/cta';

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero */}
      <SolutionsHero />

      {/* 2. Process Steps (流程圖) */}
      <SolutionsProcessSteps />

      {/* 3. Quality Assurance (施工品質) */}
      <SolutionsQuality />

      {/* 4. CTA (行動呼籲) */}
      <SolutionsCTA />
    </div>
  );
}