'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CalendarForm } from '@/components/ui/CalendarForm';
import Button from '@mui/material/Button';
import Link from 'next/link';
import pb from '@/lib/pocketbase';

interface RecordModel {
    id: string;
    city: string;
    street: string;
    number: string;
    zipcode: string;
    picture?: string; // optional field
}

export default function ListingDetail() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [listing, setListing] = useState<RecordModel | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchListing() {
            try {
                const record: RecordModel = await pb.collection('apartments').getOne(id);
                setListing(record);
            } catch (error) {
                console.error('Error fetching listing:', error);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchListing();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!listing) {
        return <p>Listing not found.</p>;
    }

    const getImageUrl = (listing: RecordModel) => {
        return listing.picture ? `${pb.baseUrl}/api/files/apartments/${listing.id}/${listing.picture}` : '/images/default.jpg';
    };

    return (
        <div className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex justify-start mb-4">
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
                </div>
                <div className="bg-gray-800 shadow-md rounded-lg p-6">
                    <h1 className="text-4xl font-bold mb-4">{listing.city}</h1>
                    <img src={getImageUrl(listing)} alt={listing.city} className="w-full h-64 object-cover mb-4" />
                    <p className="text-gray-400">{listing.street}, {listing.number}, {listing.zipcode}</p>
                    <CalendarForm listingId={listing.id} />
                </div>
            </div>
        </div>
    );
}
