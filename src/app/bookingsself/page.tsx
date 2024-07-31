'use client';
import { useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import Link from 'next/link';

interface ListingDetails {
    id: string;
    city: string;
    street: string;
    number: string;
    zipcode: string;
    picture?: string;
}

interface Booking {
    id: string;
    listing: string;
    startDate: string;
    endDate: string;
    listingDetails?: ListingDetails | null; // To store listing details including the picture
}

export default function BookingsSelf() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            const userEmail = sessionStorage.getItem('userEmail');
            if (!userEmail) {
                console.error('User not logged in');
                return;
            }

            try {
                const result = await pb.collection('buchungen').getFullList({
                    filter: `user_id="${userEmail}"`,
                });

                const bookingsWithDetails: Booking[] = await Promise.all(result.map(async (booking) => {
                    try {
                        const listingDetails = await pb.collection('apartments').getOne(booking.listing);
                        return { ...booking, listingDetails };
                    } catch (error) {
                        console.error('Error fetching listing details:', error);
                        return { ...booking, listingDetails: null };
                    }
                }));

                setBookings(bookingsWithDetails);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const getImageUrl = (listingDetails: ListingDetails | null) => {
        return listingDetails?.picture ? `${pb.baseUrl}/api/files/apartments/${listingDetails.id}/${listingDetails.picture}` : '/images/default.jpg';
    };

    return (
        <div className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen">
            <div className="w-full max-w-4xl mx-auto">
                <Button
                    className={"ml-5 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"}
                    type="button"
                    onClick={() => {
                        window.location.href = '/';
                    }}>
                    <Link href="/" legacyBehavior>
                        <a>back</a>
                    </Link>
                </Button>
                <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <div className="bg-gray-800 shadow-md rounded-lg p-6 w-full">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="mb-6 p-4 bg-gray-700 rounded-lg flex flex-col sm:flex-row">
                                {booking.listingDetails && (
                                    <img
                                        src={getImageUrl(booking.listingDetails)}
                                        alt={booking.listingDetails.city}
                                        className="w-full sm:w-48 h-48 object-cover mb-4 sm:mb-0 sm:mr-4"
                                    />
                                )}
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Listing: {booking.listingDetails?.city || 'Unknown'}</h2>
                                    <p className="text-gray-400">From: {format(new Date(booking.startDate), 'dd.MM.yyyy')}</p>
                                    <p className="text-gray-400">To: {format(new Date(booking.endDate), 'dd.MM.yyyy')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
