"use client"
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar'; 
import SideBar from '@/components/SideBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ name: string; email: string }>({ name: '', email: '' });
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // State for mobile menu toggle

    useEffect(() => {
        const getUserId = async () => {
            const userId = await getCookie('id');
            if (userId) {
                fetchUserData(userId as string);
            }
        };
        getUserId(); // Call the async function inside useEffect
    }, []);
    

    const fetchUserData = async (userId: string) => {
        try {
            const response = await axios.post('/api/user', { id: userId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setUser(response.data.user);
            } else {
                toast.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <SideBar/>
    
        {/* Main content */}
        <div className="lg:pl-64">
            {/* Top navbar */}
            <Navbar isUser={Array.isArray(Object.keys(user))} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
            {children}
        </div>
        </div>
    );
}
