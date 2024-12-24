"use client"

import { PricingHeader } from "@/components/pricing/pricing-header"
import { PricingTiers } from "@/components/pricing/pricing-tiers"

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white pt-16">
            <PricingHeader />
            <PricingTiers />
        </div>
    )
}