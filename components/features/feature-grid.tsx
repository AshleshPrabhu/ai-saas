import { Card } from "@/components/ui/card"
import { 
Layout, 
Wand2, 
Zap,
Image as ImageIcon,
Video,
LucideIcon,
GroupIcon
} from "lucide-react"

interface Feature {
icon: LucideIcon
title: string
description: string
}

const features: Feature[] = [
{
    icon: GroupIcon,
    title: "Smart Compression",
    description: "Reduce file size without compromising quality using AI-powered compression"
},
{
    icon: Layout,
    title: "Auto-Format",
    description: "Automatically resize and format content for any social media platform"
},
{
    icon: Wand2,
    title: "Background Effects",
    description: "Apply stunning effects or remove backgrounds instantly"
},
{
    icon: Zap,
    title: "Quick Processing",
    description: "Process your content in seconds with our optimized pipeline"
},
{
    icon: ImageIcon,
    title: "Image Enhancement",
    description: "Enhance colors, clarity, and quality automatically"
},
{
    icon: Video,
    title: "Video Optimization",
    description: "Optimize videos for web and mobile viewing"
}
]

export function FeatureGrid() {
return (
    <section className="py-16">
    <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
            const Icon = feature.icon
            return (
            <div 
                key={feature.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <Card className="p-6 h-full bg-white border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col h-full">
                    <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                    {feature.description}
                    </p>
                </div>
                </Card>
            </div>
            )
        })}
        </div>
    </div>
    </section>
)
}