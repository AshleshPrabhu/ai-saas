import { Card } from "@/components/ui/card"

const platforms = [
{
    name: "Instagram",
    formats: [
    { label: "Post", size: "1:1 (1080x1080px)" },
    { label: "Potrait", size: "4:5 (1080x1350px)" },
    { label: "Landscape", size: "2:1 (1080x560px)" },
    { label: "Story", size: "9:16 (1080x1920px)" },
    ],
    icon: "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-256.png"
},
{
    name: "YouTube",
    formats: [
    { label: "Thumbnail", size: "16:9 (1280x720px)" },
    { label: "Banner", size: "16:9 (2560x1440px)" },
    { label: "Video", size: "16:9 (1920x1080px)" },
    { label: "Channel Cover", size: "2560:1440 (2560x1440px)" },
    ],
    icon: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/395_Youtube_logo-256.png"
},
{
    name:"Facebook",
    formats: [
        { label: "Post", size: "1:1 (1200x1200px)" },
        { label: "Cover", size: "205:78 (820x312px)" },
        { label: "Story", size: "9:16 (1080x1920px)" },
    ],
    icon: "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png"
},
{
    name:"LinkedIn",
    formats: [
        { label: "Post", size: "2:1 (1200x628px)" },
        { label: "Cover", size: "4:1 (1584x396px)" }
    ],
    icon: "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
},
{
    name:"Twitch",
    formats: [
        { label: "Profile Banner", size: "120:48 (1200x480px)" },
        { label: "Offline Screen", size: "16:9 (1920x1080px)" },
    ],
    icon: "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/28-twitch-256.png"
},
{
    name: "TikTok",
    formats: [
    { label: "Video", size: "9:16 (1200x675px)" },
    ],
    icon: "https://cdn2.iconfinder.com/data/icons/social-media-2421/512/TikTok-256.png"
},
{
    name:"Snapchat",
    formats: [
        { label: "Story", size: "9:16 (1080x1920px)" },
    ],
    icon: "https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Snapchat-256.png"
},
{
    name:"Pinterest",
    formats: [
        { label: "Pin", size: "2:3 (1000x1500px)" },
    ],
    icon: "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Pinterest_colored_svg-512.png"
},
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