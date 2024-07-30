import PocketBase from 'pocketbase';
// @ts-ignore
let userEmail: string | null;
if (typeof window !== 'undefined') {
    // Access sessionStorage safely
    userEmail = sessionStorage.getItem('userEmail'); // Retrieve the user's email from session storage
}

const pb = new PocketBase('https://short-eventually.pockethost.io/');
export async function getPay() {
    const records = await pb.collection('users').getFullList();

    // Find the user record where the user_id matches the userEmail
    const test = sessionStorage.getItem('matchingUser');
   // const matchingRecord = records.find(record => record.user_id === test);
    const matchingRecord = records.find(record => record.email === userEmail);

// @ts-ignore
    const h_pay = matchingRecord.hourly_pay
    sessionStorage.setItem('h_pay', h_pay);

    // Check if a matching record was found and retrieve hourly_pay
    if (matchingRecord) {
        // You could set the hourly_pay in sessionStorage or return it
        // sessionStorage.setItem('userHourlyPay', matchingRecord.hourly_pay);
        return matchingRecord.hourly_pay;
    } else {
        {/* @ts-ignore */}
        console.log("No user found with the email:", userEmail);
        return null; // Or handle the absence of the user accordingly
    }
}
