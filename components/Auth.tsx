"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import Image from "next/image"
import Link from "next/link"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.email(),
        password: z.string().min(6),
    })
}

export default function AuthForm({ type }: { type: FormType }) {
    const router = useRouter();
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-in") {
                toast.success('Signed in successfully.');
                router.push('/');
            } else {
                toast.success('Account created successfully. Please sign in.');
                router.push('/sign-in');
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }

        console.log(values);
    }

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col items-center gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" width={38} height={32} />
                    <h2 className="text-primary-100">Interviewly</h2>
                </div>
                <h3>Practice job interviews with AI</h3>

                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                    {!isSignIn && (
                        <FormField
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Your Name"
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Your Email"
                        type="email"
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Your Password"
                        type="password"
                    />

                    <Button className="btn" type="submit">{isSignIn ? "Sign In" : "Create an Account"}</Button>
                </form>

                <p className="text-center">
                    {isSignIn ? "Don't have an account?" : "Already have an account?"}
                    <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-user-primary ml-1 cursor-pointer hover:underline">
                        {isSignIn ? "Sign Up" : "Sign In"}
                    </Link>
                </p>
            </div>
        </div>
    )
}
