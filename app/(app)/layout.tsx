"use client";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<{ name: string; email: string } | null>(null); // Null means not fetched yet
const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

const getUserId = useCallback(async () => {
    const userId = await getCookie("id");
    if (userId) {
    await fetchUserData(userId as string);
    } else {
    setUser(null); // No user is logged in
    }
}, []);

useEffect(() => {
    getUserId(); // Call the async function inside useEffect
}, [getUserId]);

const fetchUserData = async (userId: string) => {
    try {
    const response = await axios.post(
        "/api/user",
        { id: userId },
        {
        headers: {
            "Content-Type": "application/json",
        },
        }
    );

    if (response.data.success) {
        setUser(response.data.user);
        console.log("User fetched:", response.data.user);
    } else {
        toast.error("Failed to fetch user data");
        setUser(null);
    }
    } catch (error) {
    console.error("Error fetching user data:", error);
    setUser(null);
    }
};

return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
    {/* Sidebar */}
    <SideBar />

    {/* Main content */}
    <div className="lg:pl-64">
        {/* Top navbar */}
        <Navbar
        isUser={!!user} // Pass `true` if `user` is not null
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        />
        {children}
    </div>
    </div>
);
}
