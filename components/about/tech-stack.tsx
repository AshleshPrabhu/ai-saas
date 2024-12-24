import { Card } from "@/components/ui/card";
import { Code2, Database } from "lucide-react";
import Image from "next/image"; // For static images
import cloudinary from "../../public/cloudinary.svg";

const technologies = [
{
    icon: cloudinary,
    isImage: true, // Flag to indicate this is a static image
    title: "Cloudinary Integration",
    description: "Leveraging Cloudinary's powerful API for seamless video processing, storage, and delivery",
},
{
    icon: Code2,
    isImage: false, // Flag to indicate this is a React component
    title: "Next.js",
    description: "Built with modern web technologies for optimal performance and user experience",
},
{
    icon: Database,
    isImage: false, // Flag to indicate this is a React component
    title: "Secure Storage with neondb",
    description: "Enterprise-grade security for all your video content and project data",
},
];

export function TechStack() {
return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
    <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
        Technology Stack
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech, index) => (
            <Card
            key={tech.title}
            className="p-6 bg-white border-2 border-blue-100 hover:border-blue-200 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            >
            {tech.isImage ? (
                // Render static images with Next.js Image component
                <Image
                src={tech.icon}
                alt={tech.title}
                className="h-12 w-12 mb-4"
                />
            ) : (
                // Render React components
                <tech.icon className="h-12 w-12 text-blue-500 mb-4" />
            )}
            <h3 className="font-semibold mb-2 text-gray-900">{tech.title}</h3>
            <p className="text-gray-600">{tech.description}</p>
            </Card>
        ))}
        </div>
    </div>
    </section>
);
}
