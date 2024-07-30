import PocketBase from 'pocketbase';

// @ts-ignore
let userEmail;
if (typeof window !== 'undefined') {
    // Access sessionStorage safely
    userEmail = sessionStorage.getItem('userEmail'); // Retrieve the user's email from session storage
}

const pb = new PocketBase('https://short-eventually.pockethost.io/');

export async function getUserid() {
    const records = await pb.collection('users').getFullList();
    // @ts-ignore
    const matchingUser = records.find(user => user.email === userEmail); // Here we match the email field
    if (matchingUser) {
        if (typeof window !== 'undefined') {
            // Access sessionStorage safely
            sessionStorage.setItem('matchingUser', matchingUser.id); // Save the matching user ID in sessionStorage
        }
    } else {
        // @ts-ignore
            console.log("No user found with the email:", userEmail);
    }
}