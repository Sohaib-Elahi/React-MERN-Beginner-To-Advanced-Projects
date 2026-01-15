import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TextArea } from "./ui/textarea";
import { Label } from "./ui/label";


// 1. Define your schema using Zod
// This replaces writing manual regex or if/else checks!

const formSchema = z.object({
    name: z.string().min(2, {message: "Name must be atleast 2 characters"}),
    email: z.string().email(2, {message: "Please enter a valid email address"}),
    message: z.string().min(10, {message: "Message must be atleast 10 characters."}),
});

export default function ContactForm() {
    // 2. Initialize the form
    const {register , handleSubmit, reset,
        formState: {errors, isSubmitting}} = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                email: "",
                message: "",
            },
        });
    

    // 3. Define the submit handler
    const onSubmit = async (values) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log(values); // This is where you'd send to your backend
        toast.success("Message sent successfully!", {
            description: "We'll get back to you shortly.",
        });

        reset();
    };

    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 p-6 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900">
                    Get in Touch
                </h2>
                <p className="text-slate-500 mt-1">
                    We'd love to hear from you. Fill out the form below.
                </p>
            </div>

            {/* Form */}
            <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-6">
                    
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>

                        <Input
                            id = "name"
                            placeholder="John Doe"
                            {...register("name")}
                            className = {errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                            {errors.name && (
                                <p className="text-xs text-red-500 font-medium animate-pulse">
                                    {errors.name.message}
                                </p>
                            )}
                    </div>
                    

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email"
                            type = "email"
                            placeholder = "john@example.com"
                            {...register("email")}
                            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />

                            {errors.email && (
                                <p className="text-xs text-red-500 font-medium animate-pulse">
                                    {errors.email.message}
                                </p>
                            )}
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>

                        <TextArea 
                            id = "message"
                            placeholder = "How can we help you?"
                            {...register("message")}
                            className = {errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                            {errors.message && (
                                <p className="text-xs text-red-500 font-medium animate-pulse">
                                    {errors.message.message}
                                </p>
                            )}
                    </div>
                    
                    {/* Submit Button */}

                    <Button
                        type = "submit"
                        className = "w-full"
                        disabled = {isSubmitting}
                    >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4"/>
                            Send Message
                        </>
                    )}
                    </Button>
                </form>
            </div>
        </div>
    );
}