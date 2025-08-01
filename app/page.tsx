'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Image as ImageIcon, Sparkles, Zap, Code2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import before from "@/public/before.png"
import after from "@/public/after.png"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  return (
    <div className="flex flex-col min-h-screen  ">
      <Navbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen}/>

      <main className="flex-1">
        <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-black dark:to-gray-900  ">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight dark:text-white ">
              Transform Your Media with
              <span className="text-blue-600"> AI Magic</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Enhance your images and videos with amazing AI effects provided by Cloudinary. Create stunning content in seconds and get code snippets for it
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2">
                  Start Creating <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/examples">
                <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50 hover:text-black">
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">Powerful Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm dark:shadow-xl hover:shadow-md transition-shadow dark:hover:shadow-white">
                <ImageIcon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">Image Enhancement</h3>
                <p className="text-muted-foreground">
                  Transform your photos with AI-powered filters and effects.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm dark:shadow-xl hover:shadow-md transition-shadow dark:hover:shadow-white">
                <Video className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">Video Magic</h3>
                <p className="text-muted-foreground">
                  Add stunning effects to your videos with one click.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm dark:shadow-xl hover:shadow-md transition-shadow dark:hover:shadow-white">
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">Smart Filters</h3>
                <p className="text-muted-foreground">
                  AI-powered filters that adapt to your content.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm dark:shadow-xl hover:shadow-md transition-shadow dark:hover:shadow-white">
                <Code2 className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">Code Snippets</h3>
                <p className="text-muted-foreground">
                  Get cloudinary code snippets for your effects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">See the Magic</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg dark:shadow-white">
                <Image
                  src={before}
                  alt="Before"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-md">
                  Before
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg dark:shadow-white">
                <Image
                  src={after}
                  alt="After"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-md">
                  After (AI Enhanced)
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}