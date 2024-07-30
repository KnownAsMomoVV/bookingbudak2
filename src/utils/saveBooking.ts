import pb from '@/lib/pocketbase';

export async function saveBooking(data: { startDate: string, endDate: string, userEmail: string, listingId: number }) {
    try {
        // Check for overlapping bookings
        const existingBookings = await pb.collection('buchungen').getFullList({
            filter: `listing="${data.listingId}" && (
                (startDate <= "${data.startDate}" && endDate >= "${data.startDate}") ||
                (startDate <= "${data.endDate}" && endDate >= "${data.endDate}") ||
                (startDate >= "${data.startDate}" && endDate <= "${data.endDate}")
            )`
        });

        if (existingBookings.length > 0) {
            throw new Error("The listing is already booked for the selected dates.");
        }

        // Create the booking record directly
        const bookingData = {
            user_id: data.userEmail, // We'll use the email as the user identifier
            listing: data.listingId.toString(), // Ensure listingId is a string
            startDate: data.startDate,
            endDate: data.endDate,
        };

        console.log('Creating booking record with data:', bookingData);
        const record = await pb.collection('buchungen').create(bookingData).catch(err => {
            console.error('Error creating booking:', err);
            throw new Error("Booking creation failed");
        });
        console.log('Booking record created:', record);

        return record;
    } catch (error) {
        console.error("Error saving booking:", error);
        throw error;
    }
}
