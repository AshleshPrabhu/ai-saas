'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Wand2, Menu, LogOut, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
interface NavbarProps {
    onMenuToggle?: () => void;               
    isMenuOpen?: boolean;     
    isUser?: boolean
}
const Navbar: React.FC<NavbarProps> = ({  isUser=false,onMenuToggle, isMenuOpen }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleSignOut = async () => {
        try {
            const response = await axios.get("/api/user/logout");
            if (response.status === 200) {
            router.push("/login");
            } else {
            toast.error("Error signing out");
            return;
            }
        } catch (error) {
            console.log("logout error")
            toast.error("failed to logout")
        } finally{
            setLoading(false)
        }
    };
return (
    <header className="w-full py-6 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href={isUser?"/home":"/"} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <Wand2 className="h-6 w-6" />
        <span className="text-xl font-bold">AImagine</span>
        </Link>

        {/* Mobile menu button */}
        <button 
        className="md:hidden"
        onClick={onMenuToggle}
        >
        <Menu className="h-6 w-6" />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
        <Link href="/features" className="hover:text-blue-100 transition-colors">
            Features
        </Link>
        <Link href="/pricing" className="hover:text-blue-100 transition-colors">
            Pricing
        </Link>
        {
            isUser ? (
                null
            ):(
                <Link href="/login">
                    <Button variant="ghost" className="text-white hover:text-blue-100 hover:bg-blue-500/20">
                    Login
                    </Button>
                </Link>
            )
        }
        {
                isUser ? (
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50" onClick={handleSignOut}>
                        {loading?(
                            <Loader2/>
                        ):(
                            <div>Sign out</div>
                        )}
                    </Button>
                ):(
                    <Link href="/sign-up">
                        <Button className="bg-white text-blue-600 hover:bg-blue-50">
                        Get Started
                        </Button>
                    </Link>
                )
            }
        
        
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen  && (
        <div className="absolute top-20 left-0 right-0 bg-blue-600 p-4 md:hidden z-50">
            <nav className="flex flex-col gap-4">
            <Link href="/features" className="w-full flex items-center justify-center hover:text-blue-100 transition-colors">
                Features
            </Link>
            <Link href="/pricing" className="w-full flex items-center justify-center hover:text-blue-100 transition-colors">
                Pricing
            </Link>
            {
                isUser ? (
                    null
                ):(
                    <Link href="/login">
                        <Button variant="ghost" className="w-full text-white hover:text-blue-100 hover:bg-blue-500/20">
                        Login
                        </Button>
                    </Link>
                )
            }
            {
                !isUser ? (
                    null
                ):(
                    <Link href="/home">
                        <Button variant="ghost" className="w-full text-white hover:text-blue-100 hover:bg-blue-500/20">
                        Home
                        </Button>
                    </Link>
                )
            }
            {
                !isUser ? (
                    null
                ):(
                    <Link href="/dashboard">
                        <Button variant="ghost" className="w-full text-white hover:text-blue-100 hover:bg-blue-500/20">
                        Dashboard
                        </Button>
                    </Link>
                )
            }
            {
                !isUser ? (
                    null
                ):(
                    <Link href="/social-share">
                        <Button variant="ghost" className="w-full text-white hover:text-blue-100 hover:bg-blue-500/20">
                        Social Share
                        </Button>
                    </Link>
                )
            }
            {
                !isUser ? (
                    null
                ):(
                    <Link href="/video-upload">
                        <Button variant="ghost" className="w-full text-white hover:text-blue-100 hover:bg-blue-500/20">
                        Video Upload
                        </Button>
                    </Link>
                )
            }
            {
                !isUser ? (
                    null
                ):(
                    <Link href="/background">
                        <Button variant="ghost" className="w-full text-white hover:text-blue-100 hover:bg-blue-500/20">
                        Background
                        </Button>
                    </Link>
                )
            }
            {
                isUser ? (
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50" onClick={handleSignOut}>
                        {loading?(
                            <Loader2/>
                        ):(
                            <div>Sign out</div>
                        )}
                    </Button>
                ):(
                    <Link href="/signup">
                        <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                        Get Started
                        </Button>
                    </Link>
                )
            }
            </nav>
        </div>
        )}
    </div>
    </header>
);
}

export default Navbar