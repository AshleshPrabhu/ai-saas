"use client"

import { BeforeAfterCard } from "@/components/examples/before-after-card"

const examples = [
{
    beforeImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300&h=300&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=300&fit=crop",
    effect: "AI Enhancement"
},
{
    beforeImage: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D    ",
    afterImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop",
    effect: "Color Correction"
}
]

export default function ExamplesPage() {
return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
        <div className="container py-16">
            <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Image Transformation Examples
                </h1>
                <p className="text-blue-600/80 text-lg">
                    See the power of our AI transformations
                </p>
            </div>
            
            <div className="space-y-12">
                {examples.map((example, index) => (
                    <div
                    key={index}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                    >
                        <BeforeAfterCard
                            beforeImage={example.beforeImage}
                            afterImage={example.afterImage}
                            effect={example.effect}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
)
}