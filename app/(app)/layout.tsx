"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LogOut,
    Menu,
    LayoutDashboard,
    Share2,
    Upload,
    Image,
    ImageIcon,
    Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar'; 

const sidebarItems = [
    { href: '/home', icon: Home, label: 'Home' },
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/social-share', icon: Share2, label: 'Social Share' },
    { href: '/video-upload', icon: Upload, label: 'Video Upload' },
    { href: '/background', icon: Image, label: 'Background Effects' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string }>({ name: '', email: '' });
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // State for mobile menu toggle

    const handleSignOut = async () => {
        const response = await axios.get("/api/user/logout")
        if (response.status === 200) {
            router.push('/login');
        }else{
            toast.error('Error signing out');   
            return
        }
    };

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
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
            <div className="h-full flex flex-col">
            <div className="flex items-center justify-center h-16 px-4 border-b">
                <ImageIcon className="w-8 h-8 text-blue-600" />
            </div>
    
            <nav className="flex-1 px-4 py-4 space-y-1">
                {sidebarItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg ${pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                </Link>
                ))}
            </nav>
    
            {user && (
                <div className="p-4 border-t">
                <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                </Button>
                </div>
            )}
            </div>
        </aside>
    
        {/* Main content */}
        <div className="lg:pl-64">
            {/* Top navbar */}
            <Navbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
            {children}
        </div>
        </div>
    );
}
