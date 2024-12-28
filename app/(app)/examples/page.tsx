"use client"

import { BeforeAfterCard } from "@/components/examples/before-after-card"
import before1 from "@/public/before1.png"
import after1 from "@/public/after1.png"
import before2 from "@/public/before2.png"
import after2 from "@/public/after2.png"
import before3 from "@/public/before3.png"
import after3 from "@/public/after3.png"
import before4 from "@/public/before4.png"
import after4 from "@/public/after4.png"
import before5 from "@/public/before5.png"
import after5 from "@/public/after5.png"

const examples = [
{
    beforeImage: before1,
    afterImage: after1,
    effect: "recolor"
},
{
    beforeImage: before2,
    afterImage: after2,
    effect: "replace"
},
{
    beforeImage: before3,
    afterImage: after3,
    effect: "replace bg"
},
{
    beforeImage: before4,
    afterImage: after4,
    effect: "blur"
},
{
    beforeImage: before5,
    afterImage: after5,
    effect: "blend"
},
]

export default function ExamplesPage() {
return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-gray-900 pt-20">
        <div className="container py-16">
            <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent gradient-title">
                    Image Transformation Examples
                </h1>
                <p className="text-blue-600/80 text-lg dark:text-white">
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