"use client"
import React, {useEffect, useRef, useState} from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from "@/lib/utils";
import PocketBase from 'pocketbase';
import { NavbarMid } from '@/components/navbar';
import { Shadcard } from '@/components/shadcard';
import { Shaddialog } from '@/components/shaddialog';
import { Shadtable_pay } from "@/components/shadtable_pay";
import { getUserid } from '@/query/useUserid';
import { ShadSelect } from '@/components/shadselect';
import {ShadTable_month} from "@/components/shadtable_month_pay";
// @ts-ignore
import {Shadbutton_cal, shadbutton_cal} from "@/components/shadbutton_cal";
import { Shaddialog_pay } from '@/components/shaddialog_pay';

const pb = new PocketBase('https://short-eventually.pockethost.io/');

function handleLogout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('matchingUser');
    window.location.href = '/';
}

getUserid();

//debugger;
/*
console.log(sessionStorage.getItem('isLoggedIn'));
console.log(sessionStorage.getItem('userEmail'));
console.log(sessionStorage.getItem('matchingUser'));

 */


export default function Webbase() {
    // Initialize PocketBase client
    const pb = new PocketBase('https://short-eventually.pockethost.io/');
    const [currentSelection, setCurrentSelection] = useState('');

    useEffect(() => {
        // Immediately after logging in, you might have set a flag like this:
        // sessionStorage.setItem('forceReloadAfterLogin', 'true');

        // Check if the user is logged in when the component mounts
        const checkAuth = () => {
            if (sessionStorage.getItem('isLoggedIn') !== 'true') {
                window.location.href = '/';
            } else {
                // Check if we need to force a reload
                if (sessionStorage.getItem('forceReloadAfterLogin') === 'true') {
                    window.location.reload(); // Force a reload
                    setTimeout(() => {
                        sessionStorage.removeItem('forceReloadAfterLogin');
                    }, 10);

                }
            }
        };
        checkAuth();
    }, []);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    // @ts-ignore
    const handleSelectionChange = (selection) => {
        setCurrentSelection(selection);
    };

    //const userEmail = sessionStorage.getItem('userEmail');

    /*
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submission behavior

        if (!emailRef.current || !passwordRef.current) {
            console.error("Form inputs are not accessible");
            return;
        }

        const pb = new PocketBase('http://127.0.0.1:8090');
        const username = emailRef.current.value;
        const password = passwordRef.current.value;


        try {

            if (sessionStorage.getItem('isLoggedIn') !== 'true') {
                window.location.href = 'http://localhost:3000/login'; // Redirect to login if not logged in
            }

            await fetch('http://127.0.0.1:8090/api/collections/webusers/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
        } catch (error) {
            console.error("Error posting data to PocketBase:", error);
        }
    };
     */
    return (
        <>
            <div
                className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 ">
                 <NavbarMid></NavbarMid>
                <p>Reload if the Data doesnt load completely</p>
                <div className="mt-20">
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
                    <button onClick={handleLogout} style={{position: 'absolute', top: '20px', right: '20px'}}>Logout

                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center my-10">
                <Shaddialog></Shaddialog>
            </div>
            <div>
                <Shadbutton_cal></Shadbutton_cal>
                {/*// TODO the months store in storage now, now i should make the shadtable_month_pay work with it*/}
            </div>
            <div>
                {/* Conditionally render tables based on the current selection */}
                {/*
                {currentSelection === 'monthPay' ? <ShadTable_month></ShadTable_month> :
                    <Shadtable_pay></Shadtable_pay>}
                */}
                <Shadtable_pay></Shadtable_pay>
            </div>
        </>

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

