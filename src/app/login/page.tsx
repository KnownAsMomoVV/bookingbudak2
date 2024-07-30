"use client"
import React, { useRef } from "react";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from "@/lib/utils";
import PocketBase from 'pocketbase';

export default function Login() {
    const emailRef  = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submission behavior

        if (!emailRef.current || !passwordRef.current) {
            console.error("Form inputs are not accessible");
            return;
        }

        const pb = new PocketBase('https://hide-lesson.pockethost.io/');
        const email = emailRef.current.value.toLowerCase();
        const password = passwordRef.current.value;

        try {
            const authData = await pb.collection('users').authWithPassword(email, password);

            // Assuming authData indicates a successful login:
            if (authData) {
                console.log("User is logged in");
                sessionStorage.setItem('isLoggedIn', 'true'); // Set a flag in sessionStorage
                sessionStorage.setItem('userEmail', email); // Store the user email in sessionStorage
                window.location.href = '/';
            } else {
                console.log("User is not logged in");
                // Optionally, handle unsuccessful login attempts here
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Handle login error (e.g., show an error message to the user)
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to my TimeTracker
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
                {/* Form content remains the same */}
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="momo@user.com" type="text" ref={emailRef}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" ref={passwordRef}/>
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Login &rarr;
                    <BottomGradient/>
                </button>
                <button
                    className=" my-8 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="button"
                    onClick={() => {
                        window.location.href = '/signup';
                    }}
                >
                    Sign Up &rarr;
                    <BottomGradient/>
                </button>

                <div
                    className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>

            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
                <span
                    className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"/>
            <span
                className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
