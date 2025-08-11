"use client"

import AppHeader from "@/components/app-header"
import BentoSkillsSection from "@/components/bento/bento-skills-section"
import MapPreview from "@/components/map-preview"

export default function Page() {
  return (
    <main>
      <AppHeader />
      <BentoSkillsSection />
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h3 className="mb-2 text-lg font-semibold">Map preview</h3>
        <MapPreview height={260} />
      </section>
    </main>
  )
}
