"use client"
import React, { useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import PocketBase from 'pocketbase';

export function Signup() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submission behavior

        // Debugging logs
        console.log('Email ref:', emailRef.current);
        console.log('Password ref:', passwordRef.current);
        console.log('Confirm Password ref:', confirmPasswordRef.current);

        if (!emailRef.current?.value  || !passwordRef.current?.value || !confirmPasswordRef.current?.value) {
            console.error("All form fields are required");
            return;
        }

        // Ensure password and confirm password are the same
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            console.error("Passwords do not match");
            return;
        }

        const pb = new PocketBase('https://hide-lesson.pockethost.io/');
        try {
            // Here, we're assuming that you're using the "users" collection for user management
            const record = await pb.collection('users').create({
                email: emailRef.current.value,
                // @ts-ignore
                password: passwordRef.current.value,
                passwordConfirm: confirmPasswordRef.current.value,
                // You can add additional fields as required by your "users" collection schema
            });

            console.log(record);
            if (record) {
                console.log("User is signed up");
                // Optionally, send an email verification request
                await pb.collection('users').requestVerification(emailRef.current.value);
                window.location.href = '/';
            }

        } catch (error) {
            console.error("Error posting data to PocketBase:", error);
        }
    };


    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to my TimeTracker
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            </p>

            {/* TODO: Add moving gradient maybe maybe? */}
            {/* content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: var(--line-width);
    background: conic-gradient(from calc(var(--angle) + var(--start-angle)), transparent 0, var(--line-color) 20%, transparent 25%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: inherit;

    position: absolute;
    inset: 0;
    border-radius: inherit;
    filter: drop-shadow(0 0 10px var(--line-color)); */}
            <form className="my-8" onSubmit={handleSubmit}>
                {/* Form content remains the same */}
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="momo@user.com" type="email" ref={emailRef} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" ref={passwordRef} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password again</Label>
                    <Input id="password" placeholder="••••••••" type="password" ref={confirmPasswordRef} />
                </LabelInputContainer>


                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign up &rarr;
                    <BottomGradient />
                </button>
                <button
                    className=" my-8 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="button"
                    onClick={() => {
                        window.location.href = '/login';
                    }}
                >
                    login &rarr;
                    <BottomGradient />
                </button>

                <div
                    className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
                <span
                    className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
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
