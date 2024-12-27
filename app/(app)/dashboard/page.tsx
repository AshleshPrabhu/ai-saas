"use client";

import { ImageGrid } from "@/components/dashboard/ImageGrid";
import { StatsCards } from "@/components/dashboard/StatsCard";
import { StorageChart } from "@/components/dashboard/StorageChart";
import VideoGrid from "@/components/dashboard/VideoGrid";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function DashboardPage() {
    const [isUserPaid, setIsUserPaid] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    const getUser = useCallback(async () => {
        try {
            const idResponse = await axios.get("/api/get-token");
            const userResponse = await axios.post('/api/user', {
                id: idResponse.data.decodedToken?.id || ""
            });
            console.log(userResponse);
            setIsUserPaid(userResponse.data.user.isPaid);
        } catch (error: any) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false); // Set loading to false once fetching is done
        }
    }, []);

    useEffect(() => {
        getUser();
    }, [getUser]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <>
            {isUserPaid ? (
                <div className="container py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Dashboard Overview
                        </h1>
                    </div>
                    <div className="space-y-12">
                        <StatsCards />

                        <section>
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Videos</h2>
                            <VideoGrid />
                        </section>
                        <section>
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your Images</h2>
                            <ImageGrid />
                        </section>
                        <section>
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Content Overview</h2>
                            <StorageChart />
                        </section>
                    </div>
                </div>
            ) : (
                <div className="w-full h-screen flex items-center justify-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        This feature is for premium users. Please purchase a plan to see the dashboard.
                    </h1>
                </div>
            )}
        </>
    );
}
