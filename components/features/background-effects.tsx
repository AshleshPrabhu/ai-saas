import { Card } from "@/components/ui/card"

const effects = [
{
    name: "Background Removal",
    description: "Remove backgrounds with one click",
    image: "https://sb.kaleidousercontent.com/67418/604x802/51d867647f/people-1-transparent2.jpg"
},
{
    name: "Blur Effect",
    description: "Add professional blur effects",
    image: "https://imgs.search.brave.com/3mDmNx10iDFDhWacKraYcNsigWCzVy8yUABelbvRqpU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibHVy/LmltYWdlb25saW5l/LmNvL2JsdXItaW1h/Z2UuanBn"
},
{
    name: "Custom Backgrounds",
    description: "Add any background you want",
    image: "https://sb.kaleidousercontent.com/67418/604x802/574efac004/animals-new-background.jpg"
},
{
    name: "Ai Fill",
    description: "Fill any image with AI generated Background",
    image: "https://sb.kaleidousercontent.com/67418/604x802/fd1beb254d/prodcut-2-bg-2.jpg"
},
{
    name: "Ai Replace Background",
    description: "Fill any image with AI generated Background",
    image: "https://sb.kaleidousercontent.com/67418/604x802/b8d74bcca6/people-skater-floor-fix.png"
},
{
    name: "Ai Replace",
    description: "Restore any object with other object using AI",
    image: "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/e_gen_replace:from_person;to_cat/c_fill,w_1080,h_1080,g_center/f_auto/q_auto/v1/samples/look-up?_a=BAVAZGBy0"
},
{
    name: "Ai Recolor",
    description: "Recolor any object with any color with AI",
    image: "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/e_background_removal/e_tint:70:blue:purple/u_images:galaxy,c_fill,w_1.0,h_1.0,fl_relative/fl_layer_apply,fl_no_overflow/c_fill,w_1920,h_1920,g_auto/f_auto/q_auto/v1/images/turtle?_a=BAVAZGBy0"
},

]

export function BackgroundEffects() {
return (
    <section className="py-16">
    <div className="container">
        <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 dark:gradient-title bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Professional Background Effects
        </h2>
        <p className="dark:text-white text-blue-600/80">
            Transform your backgrounds with powerful AI effects
        </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
        {effects.map((effect, index) => (
            <div 
            key={effect.name}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            >
            <Card className="overflow-hidden bg-white border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 group">
                <div className="relative h-48">
                <img
                    src={effect.image}
                    alt={effect.name}
                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{effect.name}</h3>
                    <p className="text-sm text-white/80">{effect.description}</p>
                </div>
                </div>
            </Card>
            </div>
        ))}
        </div>
    </div>
    </section>
)
}