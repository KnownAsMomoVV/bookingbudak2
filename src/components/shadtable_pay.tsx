import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getPay } from "@/query/getPay";

const pb = new PocketBase('https://short-eventually.pockethost.io/');
export function Shadtable_pay() {
    const [hourlyPay, setHourlyPay] = useState(null);
    const [workHours, setWorkHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    //console.log(hourlyPay);

    useEffect(() => {
        async function fetchHourlyPay() {
            return await getPay(); // getPay should return hourly_pay
        }

        async function fetchData() {
            try {
                const res = await pb.collection('workhours').getFullList({
                    filter: `user_id = "${sessionStorage.getItem('matchingUser')}"`,
                });
                return res;
            } catch (err) {
                // @ts-ignore
                throw new Error('Error fetching data:', err);
            }
        }
        async function fetchAllData() {
            setLoading(true);
            try {
                const [pay, workHoursData] = await Promise.all([
                    fetchHourlyPay(),
                    fetchData(),
                ]);
                setHourlyPay(pay);
                // @ts-ignore
                setWorkHours(workHoursData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchAllData();
    }, []);
    // @ts-ignore
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    // Calculate the total money earned
    const calculateTotal = () => {
        // @ts-ignore
        return workHours.reduce((total, record) => total + (record.hours_worked * hourlyPay), 0).toFixed(2);
    };

    const nextPage = () => {
        const totalPages = Math.ceil(workHours.length / itemsPerPage);
        setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages - 1));
    };

    const prevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 0));
    };

    const displayedItems = workHours.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);


    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <>
            <Table>
                <TableCaption>A list of the hours worked and when!</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Hours Worked</TableHead>
                        <TableHead className="text-right">Money</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayedItems.map((record, index) => (
                        <TableRow key={index}>
                            {/* @ts-ignore */}
                            <TableCell className="font-medium">{record.user_id}</TableCell>
                            {/* @ts-ignore */}
                            <TableCell>{formatDate(record.date_worked)}</TableCell>
                            {/* @ts-ignore */}
                            <TableCell>{record.hours_worked}</TableCell>
                            <TableCell className="text-right">
                                {/* @ts-ignore */}
                                €{(record.hours_worked * hourlyPay).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">€{calculateTotal()}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-between mt-4">
                <button onClick={prevPage}>&lt; Previous</button>
                <button onClick={nextPage}>Next &gt;</button>
            </div>
        </>
    );
}