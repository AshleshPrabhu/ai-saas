// components/Navbar.jsx
'use client';

import { Button } from '@/components/ui/button';
import { Wand2, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
interface NavbarProps {
    onMenuToggle?: () => void;               
    isMenuOpen?: boolean;     
    isUser?: boolean
}
const Navbar: React.FC<NavbarProps> = ({  isUser=false,onMenuToggle, isMenuOpen }) => {
return (
    <header className="w-full py-6 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
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
        <Link href="#features" className="hover:text-blue-100 transition-colors">
            Features
        </Link>
        <Link href="#pricing" className="hover:text-blue-100 transition-colors">
            Pricing
        </Link>
        <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-blue-100 hover:bg-blue-500/20">
            Login
            </Button>
        </Link>
        <Link href="/sign-up">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
            Get Started
            </Button>
        </Link>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-blue-600 p-4 md:hidden">
            <nav className="flex flex-col gap-4">
            <Link href="#features" className="hover:text-blue-100 transition-colors">
                Features
            </Link>
            <Link href="#pricing" className="hover:text-blue-100 transition-colors">
                Pricing
            </Link>
            <Link href="/login">
                <Button variant="ghost" className="w-full text-white hover:text-blue-100 hover:bg-blue-500/20">
                Login
                </Button>
            </Link>
            <Link href="/signup">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                Get Started
                </Button>
            </Link>
            </nav>
        </div>
        )}
    </div>
    </header>
);
}

export default Navbar