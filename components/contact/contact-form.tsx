"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export function ContactForm() {
const [isSubmitting, setIsSubmitting] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add form submission logic here
    setTimeout(() => setIsSubmitting(false), 1000)
}

return (
    <Card className="p-8 bg-white border-2 border-blue-100">
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
        <Input placeholder="Name" className="border-blue-200 focus:border-blue-400" />
        </div>
        <div>
        <Input type="email" placeholder="Email" className="border-blue-200 focus:border-blue-400" />
        </div>
        <div>
        <Input placeholder="Subject" className="border-blue-200 focus:border-blue-400" />
        </div>
        <div>
        <Textarea 
            placeholder="Message" 
            className="min-h-[150px] border-blue-200 focus:border-blue-400" 
        />
        </div>
        <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isSubmitting}
        >
        {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
    </form>
    </Card>
)
}