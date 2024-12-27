"use client";

import { Card } from "@/components/ui/card";
import axios from "axios";
import { ArrowUpRight, Video, Image } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// Define types for stat items
interface StatItem {
    title: string;
    value: string;
    icon: typeof Video; // Icon type from lucide-react
    color: string;
}

// Define types for API responses
interface TokenResponse {
    success: boolean;
    decodedToken: {
        id: string;
    };
}

interface UserResponse {
    user: {
        images: Array<any>; // You can replace `any` with a more specific type if you have one
        videos: Array<any>;
    };
}

export function StatsCards() {
    const [stats, setStats] = useState<StatItem[]>([]); // Use the `StatItem` type for state

    const getData = useCallback(async () => {
        try {
            // Fetch the token
            const response = await axios.get<TokenResponse>("/api/get-token");
            if (!response.data.success) {
                toast.error("Failed to fetch token");
                return;
            }

            // Fetch the user data
            const userResponse = await axios.post<UserResponse>("/api/user", {
                id: response.data.decodedToken.id,
            });

            const user = userResponse.data.user;

            // Validate and update stats
            if (user.images && Array.isArray(user.images) && user.videos && Array.isArray(user.videos)) {
                setStats([
                    {
                        title: "Total Videos",
                        value: `${user.videos.length}`,
                        icon: Video,
                        color: "blue",
                    },
                    {
                        title: "Images Converted",
                        value: `${user.images.length}`,
                        icon: Image,
                        color: "purple",
                    },
                ]);
            } else if (user.images.length === 0 && user.videos.length===0) {
                setStats([
                    {
                        title: "Total Videos",
                        value: "0",
                        icon: Video,
                        color: "blue",
                    },
                    {
                        title: "Images Converted",
                        value: "0",
                        icon: Image,
                        color: "purple",
                    },
                ]);
            } else {
                toast.error("Failed to fetch details");
                return;
            }
        } catch (error) {
            toast.error("An error occurred while fetching data");
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
                <div
                    key={stat.title}
                    className={`animate-fade-in animate-delay-${index * 100}`}
                >
                    <Card className="p-6 bg-white border-2 border-blue-100 hover:border-blue-200 transition-all hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-600">{stat.title}</h3>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </Card>
                </div>
            ))}
        </div>
    );
}
