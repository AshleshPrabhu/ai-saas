"use client"

import { FeatureHero } from "@/components/features/feature-hero"
import { FeatureGrid } from "@/components/features/feature-grid"
import { SocialMediaFormats } from "@/components/features/social-media-formats"
import { BackgroundEffects } from "@/components/features/background-effects"

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
        <FeatureHero />
        <FeatureGrid />
        <SocialMediaFormats />
        <BackgroundEffects />
        </div>
    )
}