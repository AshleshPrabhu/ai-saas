'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface FormData {
    name: string;
    email: string;
    password: string;
}

export default function Signup() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            setLoading(true)
            const { name, email, password } = formData;
        
            // Basic email validation
            if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
                toast.error("enter a valid email format")
                return;
            }
            if(password.trim().length===0){
                toast.error("password is required")
                return;
            }
            if(!name){
                toast.error("name is required")
                return
            }
            const response = await axios.post(
                '/api/user/signup',
                {
                    name,
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ) ;
            if(response.data.success===false){
                toast.error(response.data.error)
                return
            }
            toast.success("Signup Successfull")
            router.push('/login')
        } catch (error) {
            console.log(error)
            toast.error("failed to signup")
        }finally{
            setLoading(false)
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };
    
return (
    <div className="min-h-screen flex flex-col">
    <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
            <Wand2 className="h-6 w-6" />
            AImagine
            </Link>
            <h2 className="mt-6 text-3xl font-bold">Create your account</h2>
            <p className="mt-2 text-muted-foreground">
            Start creating amazing content with AI
            </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
            <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                required
                className="mt-1"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
            </div>
            <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="mt-1"
                name="email"
                value={formData.email}
                onChange={handleChange}
                />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                id="password"
                type="password"
                placeholder="Create a password"
                required
                className="mt-1"
                name="password"
                value={formData.password}
                onChange={handleChange}
                />
            </div>
            </div>

            <Button type="submit" className="w-full">
            {loading?(
                <Loader2/>
            ):(
                <div>Create Account</div>
            )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary/90">
                Sign in
            </Link>
            </p>
        </form>
        </div>
    </div>
    </div>
);
}