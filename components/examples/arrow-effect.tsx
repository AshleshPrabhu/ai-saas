"use client"

import { ArrowRight } from "lucide-react"

interface ArrowEffectProps {
    effect: string
}

export function ArrowEffect({ effect }: ArrowEffectProps) {
return (
    <div className="flex flex-col items-center gap-3 py-4">
        <div className="relative transform transition-transform duration-300 hover:scale-105">
            <span className="text-sm font-medium text-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
            {effect}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-xl opacity-20 -z-10" />
        </div>
        
        <div className="animate-bounce-x">
            <ArrowRight className="w-8 h-8 text-blue-500" />
        </div>
    </div>
)
}