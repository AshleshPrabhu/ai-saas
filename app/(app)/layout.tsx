"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
const [isMenuOpen, setIsMenuOpen] = useState(false); 
const [isuser, setIsuser] = useState(false)
const getUserId = async () => {
    const response = await axios.get("/api/get-token");
    if (!response.data.success) {
        return;
    }
    setIsuser(true)
};

useEffect(() => {
    getUserId(); 
}, []);

return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
    {/* Sidebar */}
    <SideBar />

    {/* Main content */}
    <div className="lg:pl-64">
        {/* Top navbar */}
        <Navbar
        isUser={isuser} 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        />
        {children}
    </div>
    </div>
);
}
