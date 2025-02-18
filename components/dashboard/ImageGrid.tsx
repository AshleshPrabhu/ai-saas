"use client";

import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";

// Define response types for better TypeScript support
interface TokenResponse {
success: boolean;
decodedToken: {
    id: string;
};
}

interface UserResponse {
    user: {
        images: string[];
    } | null;
}


export function ImageGrid() {
    const [images, setImages] = useState<string[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);
    const handleDownload = () => {
        if (!imageRef.current) return;
        fetch(imageRef.current.src)
            .then((res) => res.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${Math.random().toString(36).substring(2, 10)}.png`;
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            });
    };
    // Fetch images with proper error handling
    const getImages = useCallback(async (): Promise<void> => {
        try {
            const response = await axios.get<TokenResponse>("/api/get-token");
            if (!response.data.success) {
                toast.error("Failed to fetch token");
                return;
            }

            const userResponse = await axios.post<UserResponse>("/api/user", {
                id: response.data.decodedToken.id,
            });

            const user = userResponse.data.user;
            if (user?.images && Array.isArray(user.images)) {
                setImages(user.images);
            } else {
                setImages([]);
                toast.error("No images found");
            }
        } catch (error) {
            toast.error("An error occurred while fetching images");
            console.error("Error fetching images:", error);
        }
    }, []);

    useEffect(() => {
        getImages();
    }, [getImages]);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {images.map((image, index) => (
                <Card
                key={index} 
                className="overflow-hidden border-2 border-blue-100 hover:border-blue-200 transition-all hover:-translate-y-1 cursor-pointer"
                >
                <div className="relative group">
                    <img
                    src={image}
                    alt={`Image ${index + 1}`} 
                    className="w-full aspect-square object-cover"
                    ref={imageRef}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleDownload}
                    >
                        <Download className="w-8 h-8 text-white" />
                    </div>
                </div>
                </Card>
            ))}
        </div>
    );
}
