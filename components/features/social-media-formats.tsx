import { Card } from "@/components/ui/card"

const platforms = [
{
    name: "Instagram",
    formats: [
    { label: "Post", size: "1:1 (1080x1080px)" },
    { label: "Story", size: "9:16 (1080x1920px)" },
    { label: "Reel", size: "9:16 (1080x1920px)" }
    ],
    icon: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=60&h=60&fit=crop"
},
{
    name: "YouTube",
    formats: [
    { label: "Thumbnail", size: "16:9 (1280x720px)" },
    { label: "Banner", size: "16:9 (2560x1440px)" },
    { label: "Video", size: "16:9 (1920x1080px)" }
    ],
    icon: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=60&h=60&fit=crop"
},
{
    name: "TikTok",
    formats: [
    { label: "Video", size: "9:16 (1080x1920px)" },
    { label: "Profile", size: "1:1 (200x200px)" }
    ],
    icon: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=60&h=60&fit=crop"
}
]

export function SocialMediaFormats() {
return (
    <section className="py-16 bg-blue-50">
    <div className="container">
        <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Perfect Formats for Every Platform
        </h2>
        <p className="text-blue-600/80">
            Automatically resize your content for any social media platform
        </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
        {platforms.map((platform) => (
            <div 
            key={platform.name}
            className="animate-fade-in"
            >
            <Card className="p-6 bg-white border-2 border-blue-100">
                <div className="flex items-center gap-4 mb-6">
                <img
                    src={platform.icon}
                    alt={platform.name}
                    className="w-10 h-10 rounded-full"
                />
                <h3 className="text-xl font-semibold">{platform.name}</h3>
                </div>
                <div className="space-y-4">
                {platform.formats.map((format) => (
                    <div 
                    key={format.label}
                    className="p-3 bg-blue-50 rounded-lg"
                    >
                    <p className="font-medium text-gray-900">{format.label}</p>
                    <p className="text-sm text-blue-600">{format.size}</p>
                    </div>
                ))}
                </div>
            </Card>
            </div>
        ))}
        </div>
    </div>
    </section>
)
}