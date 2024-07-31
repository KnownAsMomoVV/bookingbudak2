'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ResponsiveAppBar from '@/components/navbar';
import pb from '@/lib/pocketbase';

interface RecordModel {
    id: string;
    city: string;
    street: string;
    country_tag: string;
    zipcode: string;
    picture?: string;
    // Add other fields as necessary
}

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [listings, setListings] = useState<RecordModel[]>([]);

    useEffect(() => {
        // Check if running in the browser
        if (typeof window !== 'undefined') {
            // Fetch listings from PocketBase
            async function fetchListings() {
                try {
                    const records: RecordModel[] = await pb.collection('apartments').getFullList({
                        sort: '-created',
                    });
                    setListings(records);
                } catch (error) {
                    console.error('Error fetching listings:', error);
                }
            }

            // Check login status
            const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(loggedIn);

            fetchListings();
        }
    }, []);

    const filteredListings = listings.filter(listing =>
        listing.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.street.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getImageUrl = (listing: RecordModel) => {
        return listing.picture ? `${pb.baseUrl}/api/files/apartments/${listing.id}/${listing.picture}` : '/images/default.jpg';
    };

    return (
        <main className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <ResponsiveAppBar />
            <div className="w-full max-w-7xl mx-auto bg-gray-800 shadow-md rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Your Next Stay</h1>
                <div className="flex items-center justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Search for a location"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-3/4 p-4 border border-gray-600 rounded-l-lg focus:outline-none bg-gray-700 text-white"
                    />
                    <button className="p-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                        Search
                    </button>
                </div>
            </div>

            {/* Listings Grid */}
            <div className="w-full max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredListings.map((listing) => (
                    <div key={listing.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <img
                            src={getImageUrl(listing)}
                            alt={`${listing.city}, ${listing.street}`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-2">{`${listing.city}, ${listing.street}`}</h2>
                            <p className="text-gray-400 mb-4">{`${listing.country_tag}, ${listing.zipcode}`}</p>
                            <Link href={`/booking/${listing.id}`} legacyBehavior>
                                <a className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                    Book Now
                                </a>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
