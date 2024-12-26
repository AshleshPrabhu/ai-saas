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

interface User {
    email:string   
    name:string
    videos: object
    isPaid:boolean
    order:{
        plan:string
    }
    images:string[]
}

export function PricingTiers() {
    const  loadScript =(src:string)=>{
        return new Promise((resolve)=>{
            const script = document.createElement('script');
            script.src = src;
            script.onload =()=>{
                resolve(true);
            }
            script.onerror =()=>{
                resolve(false);
            }
            document.body.appendChild(script);
        })
    }
    useEffect(()=>{
        loadScript('https://checkout.razorpay.com/v1/checkout.js')
    },[])
    
    const router = useRouter()
    const [hoveredTier, setHoveredTier] = useState<string | null>(null)
    const [id, setId] = useState<string>("")
    const [user, setUser] = useState<User>()
    const getUserId = async () => {
        const response = await axios.get("/api/get-token");
        if (!response.data.success) {
            toast.error("Failed to upload");
        }
        setId(response.data.decodedToken.id);
        const userres = await axios.post("/api/user",{id:response.data.decodedToken.id})
        if (!userres.data.success) {
            toast.error("Failed to fetch user");
        }
        setUser(userres.data.user)
    };

    useEffect(() => {
        getUserId(); // Call the async function inside useEffect
    }, []);
    const handlePayment = async (plan: string, amount: number) => {
        try {
            if(plan==="Premium") plan="fullpremium"
            if(plan==="Trial Premium") plan="onepremium"
        const response = await axios.post("/api/order", {
            plan,
            amount,
            currency: "INR",
            userId:id,
        });
    
        if (!response.data.success) {
            toast.error("Failed to create order: " + response.data.error);
            return;
        }
    
        const order = response.data.order;
    
        const options = {
            key: process.env.KEY_ID || "", // Public Key
            amount: order.amount,
            currency: "INR",
            name: "Acme Corp",
            description: "Subscription Payment",
            order_id: order.razorpayId,
            handler: async (response: any) => {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
                response;
            try {
                const verificationResponse = await axios.post("/api/verify", {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                });
                if (!verificationResponse.data.success) {
                toast.error(
                    "Failed to verify payment: " +
                    verificationResponse.data.error
                );
                return;
                }
                toast.success("Payment successful!");
                router.push("/home");
            } catch (verificationError) {
                console.error(verificationError);
                toast.error("Error verifying payment");
            }
            },
            prefill: {
            email: "example@gmail.com", // Prefill user details
            },
            theme: {
            color: "#3399cc",
            },
        };
    
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
        } catch (error) {
        console.error(error);
        toast.error("Failed to initiate payment");
        }
    };
    
    const handlePlanSelect = (tier: typeof tiers[0]) => {
        if (tier.name === "Free") {
        id ? router.push("/home") : router.push("/login");
        } else {
        id ? handlePayment(tier.name, parseFloat(tier.price)) : router.push("/login");
        }
    };

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
                        onClick={() => handlePlanSelect(tier)} 
                        className={`w-full transition-colors duration-300 
                            ${hoveredTier === tier.name 
                                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                                : "bg-blue-100 hover:bg-blue-200 text-blue-600"} 
                            ${user && user.isPaid && tier.name !== user.order.plan ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={user && user.isPaid && tier.name !== user.order.plan}  // Disable button for other plans
                    >
                        {
                            user && user.isPaid && tier.name === user.order.plan ? (
                                <div>Continue</div> // Show "Continue" button if they are on the paid plan
                            ) : (
                                <div>{tier.buttonText}</div> // Show regular button text for other cases
                            )
                        }
                    </Button>
                </Card>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
}