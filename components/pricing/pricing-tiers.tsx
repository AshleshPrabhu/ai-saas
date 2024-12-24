"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import axios from "axios"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const tiers = [
{
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
    "Video upload up to 720p",
    "Basic background effects",
    "Social media sharing",
    "Community support",
    "Get free code"
    ],
    buttonText: "Get Started",
},
{
    name: "Premium",
    price: "29",
    description: "For professional creators",
    isPopular: true,
    features: [
    "Everything in Free",
    "4K video upload",
    "Advanced AI effects",
    "Premium support",
    "Custom branding",
    "Analytics dashboard",
    "Get free code"
    ],
    buttonText: "Subscribe Now",
},
{
    name: "Trial Premium",
    price: "0.5",
    duration: "1 Day",
    description: "Try all premium features",
    features: [
    "Full Premium access",
    "4K video upload",
    "All AI effects",
    "20GB storage",
    "Priority support",
    "Get free code"
    ],
    buttonText: "Subscribe now",
}
]

export function PricingTiers() {
const router = useRouter()
const [hoveredTier, setHoveredTier] = useState<string | null>(null)
const [id, setId] = useState<string>("")
const getUserId = async () => {
    const response = await axios.get("/api/get-token");
    if (!response.data.success) {
        toast.error("Failed to upload");
    }
    setId(response.data.decodedToken.id);
};

useEffect(() => {
    getUserId(); // Call the async function inside useEffect
}, []);

const handlePlanSelect = (tier: string) => {
    if (tier === "Free") {
        if(id===""){
            router.push("/login")   
        }else{
            router.push("/home")
        }

    } else {
        if(id===""){
            router.push("/login")
        }else{

        }
    }
}

return (
    <section className="py-24">
    <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
            <div 
            key={tier.name} 
            className="flex"
            onMouseEnter={() => setHoveredTier(tier.name)}
            onMouseLeave={() => setHoveredTier(null)}
            >
            <Card 
                className={`flex flex-col p-8 w-full bg-white border-2 transition-all duration-300
                ${hoveredTier === tier.name
                    ? "border-blue-400 shadow-lg shadow-blue-100 scale-105" 
                    : "border-blue-100"}`}
            >
                {tier.isPopular && (
                <div className="px-3 py-1 text-sm text-white bg-blue-500 rounded-full w-fit mb-4">
                    Popular Choice
                </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                
                <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                {tier.duration ? (
                    <span className="text-gray-600">/{tier.duration}</span>
                ) : (
                    <span className="text-gray-600">/month</span>
                )}
                </div>
                
                <p className="text-gray-600 mb-6">{tier.description}</p>
                
                <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                    {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                        <Check className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                        {feature}
                    </li>
                    ))}
                </ul>
                </div>
                
                <Button 
                onClick={() => handlePlanSelect(tier.name)}
                className={`w-full transition-colors duration-300 ${
                    hoveredTier === tier.name
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                }`}
                >
                {tier.buttonText}
                </Button>
            </Card>
            </div>
        ))}
        </div>
    </div>
    </section>
)
}