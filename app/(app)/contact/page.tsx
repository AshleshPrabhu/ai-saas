"use client"

import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export default function ContactPage() {
return (
    <div className="min-h-screen dark:bg-black">
        <div className="container py-16 dark:bg-black">
            <div className="grid gap-8 md:grid-cols-2 animate-fade-in">
                <ContactInfo />
                <ContactForm />
            </div> 
        </div>
    </div>
)
}