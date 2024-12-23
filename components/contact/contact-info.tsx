import { Mail, MapPin, Phone } from "lucide-react"

export function ContactInfo() {
return (
    <div className="space-y-8">
    <div>
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
        Get in Touch
        </h1>
        <p className="text-gray-600">
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
    </div>
    
    <div className="space-y-6">
        <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
            <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <div>
            <p className="font-medium text-gray-900">Email</p>
            <p className="text-gray-600">ashlesh.prabhu5@gmail.com</p>
        </div>
        </div>
        <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
            <Phone className="h-6 w-6 text-blue-600" />
        </div>
        <div>
            <p className="font-medium text-gray-900">Phone</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
        </div>
        </div>
        <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
            <MapPin className="h-6 w-6 text-blue-600" />
        </div>
        <div>
            <p className="font-medium text-gray-900">Address</p>
            <p className="text-gray-600">Udupi , Karnataka , India</p>
        </div>
        </div>
    </div>
    </div>
)
}