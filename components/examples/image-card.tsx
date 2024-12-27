"use client"

import Image, { StaticImageData } from "next/image" 

interface ImageCardProps {
    image: StaticImageData 
    label: string
}

export function ImageCard({ image, label }: ImageCardProps) {
    return (
        <div className="space-y-4">
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-xl border-2 border-blue-100 shadow-md group">
                <Image
                src={image}
                alt={label}
                layout="fill" 
                objectFit="cover" 
                className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-center mr-28">
                <p className="text-sm font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full inline-block">
                {label}
                </p>
            </div>
        </div>
    )
}
