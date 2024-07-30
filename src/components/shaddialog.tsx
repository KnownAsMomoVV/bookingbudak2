import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/shaddatepicker";
import PocketBase from 'pocketbase';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {getUserid} from "@/query/useUserid";
import {getPay} from "@/query/getPay";

export function Shaddialog() {
    const emailRef = useRef<HTMLInputElement>(null);
    const hoursRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState({ visible: false, title: '', description: '' });
    //const userEmail = sessionStorage.getItem('userEmail');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // State to store the selected date

// @ts-ignore
    let userID;
    if (typeof window !== 'undefined') {
        // Access sessionStorage safely
        userID = sessionStorage.getItem('matchingUser');
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submission behavior
        setAlert({ visible: false, title: '', description: '' }); // Reset the alert
        setIsSubmitting(true); // To handle the progress state if you're using it

        if (!emailRef.current || !hoursRef.current || !selectedDate) {
            console.error("Form inputs or date are not accessible");
            return;
        }

        const pb = new PocketBase('https://short-eventually.pockethost.io/');
        const email = emailRef.current.value;
        const hoursWorked = hoursRef.current.value;
        const date = selectedDate;

        // Format the date as "dd-MM"
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}`;;

        const records = await pb.collection('users').getFullList({
            filter: `email = "${email}"`,
            sort: '-created', // Sorting by creation date in descending order
        });

        console.log(records);

        try {
            await fetch('https://short-eventually.pockethost.io/api/collections/workhours/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: email, hours_worked: hoursWorked, date_worked: date }), // Adjust the key names and the date format
            });
            setAlert({
                visible: true,
                title: 'Success!',
                description: 'Your hours have been saved successfully.'
            });
        } catch (error) {
            setAlert({
                visible: true,
                title: 'Error!',
                description: 'There was an issue saving your hours.'
            });
            console.error("Error posting data to PocketBase:", error);
        } finally {
            setIsSubmitting(false); // End the submission process
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Hours</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    {alert.visible && (
                        <Alert>
                            <AlertTitle>{alert.title}</AlertTitle>
                            <AlertDescription>{alert.description}</AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}> {/* Ensure the form tag is used for handling submit */}
                    <DialogHeader>
                        <DialogTitle>How much did you work?</DialogTitle>
                        <DialogDescription>
                            Schreibe rein wie viel du gearbeitet hast!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Label htmlFor="user_id">User ID</Label>
                        <Input
                            id="user_id"
                            readOnly={true}
                            // @ts-ignore
                            defaultValue={userID}
                            ref={emailRef}
                        />
                        <Label htmlFor="hours_worked">Hours worked</Label>
                        <Input
                            id="hours_worked"
                            defaultValue="2"
                            ref={hoursRef}
                        />
                        <Label>Date</Label>
                        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
                    </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                            {isSubmitting}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
