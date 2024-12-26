import { Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
        <Link href="/" className="flex items-center gap-2">
            <Wand2 className="h-6 w-6" />
            <span className="text-xl font-bold">AImagine</span>
        </Link>
        <p className="text-blue-200">
            Transform your media with amazing AI technology provided by cloudinary
        </p>
        </div>

        <div>
        <h3 className="font-semibold mb-4">Product</h3>
        <ul className="space-y-2 text-blue-200">
            <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="#examples" className="hover:text-white transition-colors">Examples</Link></li>
        </ul>
        </div>

        <div>
        <h3 className="font-semibold mb-4">Company</h3>
        <ul className="space-y-2 text-blue-200">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
        </ul>
        </div>

        <div>
        <h3 className="font-semibold mb-4">Connect</h3>
        <div className="flex gap-4">
            <Link href="#" className="hover:text-blue-200 transition-colors">
            <i className="fa-brands fa-github h-5 w-5"></i>
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
            <i className="fa-brands fa-twitter h-5 w-5"></i>
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
            <i className="fa-brands fa-linkedin h-5 w-5"></i>
            </Link>
        </div>
        </div>

        <div className="col-span-full border-t border-blue-700 pt-8 mt-8 text-center text-blue-200">
        <p>© 2024 AImagine. All rights reserved.</p>
        </div>
    </div>
    </footer>
);
}