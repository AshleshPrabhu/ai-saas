"use client"

import { Card } from "@/components/ui/card"
import { ArrowEffect } from "./arrow-effect"
import { ImageCard } from "./image-card"
import { StaticImageData } from "next/image"

interface BeforeAfterCardProps {
    beforeImage: StaticImageData 
    afterImage: StaticImageData 
    effect: string
}

export function BeforeAfterCard({
    beforeImage,
    afterImage,
    effect,
}: BeforeAfterCardProps) {
return (
    <Card className="p-8 dark:bg-slate-600 border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 transform transition-transform duration-300 hover:scale-102">
                <ImageCard image={beforeImage} label="Before" />
            </div>

            <ArrowEffect effect={effect} />

            <div className="flex-1 transform transition-transform duration-300 hover:scale-102">
                <ImageCard image={afterImage} label="After" />
            </div>
        </div>
    </Card>
)
}
