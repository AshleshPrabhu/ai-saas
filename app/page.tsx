'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Image as ImageIcon, Sparkles, Zap, Code2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen}/>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
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
              <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50">
                View Examples
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Powerful Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <ImageIcon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Image Enhancement</h3>
                <p className="text-muted-foreground">
                  Transform your photos with AI-powered filters and effects.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Video className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Video Magic</h3>
                <p className="text-muted-foreground">
                  Add stunning effects to your videos with one click.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Filters</h3>
                <p className="text-muted-foreground">
                  AI-powered filters that adapt to your content.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Code2 className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Code Snippets</h3>
                <p className="text-muted-foreground">
                  Get cloudinary code snippets for your effects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">See the Magic</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
                  alt="Before"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-md">
                  Before
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80"
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