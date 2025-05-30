'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { Loader2, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface FormData {
    email :string,
    password :string
}

export default function Login() {
    const router =useRouter()
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [formData,setFormData] = useState<FormData>({
        email : '',
        password : ''
    })
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            setLoading(true)
            const { email, password } = formData;
        
            // Basic email validation
            if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
                toast.error("enter a valid email format")
                return;
            }
            if(password.trim().length===0){
                toast.error("password is required")
                return;
            }
            const response = await axios.post(
                '/api/user/login',
                {
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
                // console.log(response.data)
                toast.error(response.data.error)
                return
            }
            setFormData({
                email : '',
                password : ''
            })
            toast.success("login Successfull")
            setDisable(true)
            router.push('/home')
        } catch (error) {
            toast.error("failed to login")
            // console.log(error)
        }finally{
            setLoading(false)
        }

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };
return (
    <div className="min-h-screen flex flex-col dark:bg-black">
    <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold dark:text-white">
            <Wand2 className="h-6 w-6" />
            AImagine
            </Link>
            <h2 className="mt-6 text-3xl font-bold dark:text-white">Welcome back</h2>
            <p className="mt-2 text-muted-foreground dark:text-white">
            Sign in to your account to continue
            </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
            <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="mt-1 dark:placeholder:text-white dark:text-white"
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
                placeholder="Enter your password"
                required
                className="mt-1 dark:placeholder:text-white dark:text-white"
                name="password"
                onChange={handleChange}
                />
            </div>
            </div>

            <div className="flex items-center justify-between">
            <div className="text-sm">
                <Link href="/forgot-password" className="text-primary hover:text-primary/90 dark:text-blue-300">
                Forgot your password?
                </Link>
            </div>
            </div>

            <Button type="submit" disabled={disable} className={`w-full ${disable?"cursor-not-allowed":"cursor-pointer"}`} >
            {loading?(
                <Loader2/>
            ):(
                <div>Sign in</div>
            )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-primary hover:text-primary/90 dark:text-blue-300">
                Sign up
            </Link>
            </p>
        </form>
        </div>
    </div>
    </div>
);
}