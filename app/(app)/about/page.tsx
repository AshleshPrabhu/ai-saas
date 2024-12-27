"use client"

import { AboutHero } from "@/components/about/about-hero"
import { CreatorSection } from "@/components/about/creater-section"
import { TechStack } from "@/components/about/tech-stack"

export default function AboutPage() {
    return (
        <div className="min-h-screen dark:bg-black bg-white pt-16">
            <AboutHero />
            <CreatorSection />
            <TechStack />
        </div>
    )
}