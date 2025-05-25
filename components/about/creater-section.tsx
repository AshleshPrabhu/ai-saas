import { Card } from "@/components/ui/card"
import {  Mail } from "lucide-react"
import Link from "next/link"
import myimg from "@/public/Photo.jpg"
import Image from "next/image"

export function CreatorSection() {
return (
    <section className="py-24 bg-white dark:bg-black">
    <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
        Meet the Creator
        </h2>
        
        <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden bg-white border-2 border-blue-100 hover:border-blue-200 transition-colors">
            <div className="aspect-video relative">
            <img
                src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&h=400&fit=crop"
                alt="Workspace"
                className="w-full h-full object-cover"
            />
            </div>
            <div className="p-8 text-center">
            <Image
                src={myimg}
                alt="Creator"
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-100"
                width={128} 
                height={128}
            />
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Ashlesh Prabhu</h3>
            <p className="text-blue-600 mb-4">Founder & Developer</p>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Full-stack developer passionate about creating websites with different tech stacks.
                Passionate to explore different frameworks and TechStacks
            </p>
            
            <div className="flex justify-center gap-4">
                <Link href="https://github.com/AshleshPrabhu" className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <i className="fa-brands fa-github h-5 w-5" suppressHydrationWarning></i>
                </Link>
                <Link href="https://linkedin.com/in/ashlesh-prabhu-bb457b312/" className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <i className="fa-brands fa-linkedin h-5 w-5" suppressHydrationWarning></i>
                </Link>
                <Link href="mailto:ashlesh.prabhu5@gmail.com" className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <Mail className="w-5 h-5" />
                </Link>
            </div>
            </div>
        </Card>
        </div>
    </div>
    </section>
)
}