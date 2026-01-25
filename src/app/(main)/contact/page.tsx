'use client';

import { ContactHero } from "@/components/sections/contact/hero";
import { ContactMainContent } from "@/components/sections/contact/main-content";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <ContactHero />
      <ContactMainContent />
    </div>
  );
}