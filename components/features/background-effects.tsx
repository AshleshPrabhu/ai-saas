import { Card } from "@/components/ui/card"

const effects = [
{
    name: "Background Removal",
    description: "Remove backgrounds with one click",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop"
},
{
    name: "Blur Effect",
    description: "Add professional blur effects",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400&h=300&fit=crop"
},
{
    name: "Custom Backgrounds",
    description: "Add any background you want",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop"
}
]

export function BackgroundEffects() {
return (
    <section className="py-16">
    <div className="container">
        <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Professional Background Effects
        </h2>
        <p className="text-blue-600/80">
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
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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