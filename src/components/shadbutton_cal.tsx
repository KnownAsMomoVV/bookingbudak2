import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export function Shadbutton_cal() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const maxVisibleButtons = 4;
    const [visibleStartIndex, setVisibleStartIndex] = useState(0);

    // @ts-ignore
    if (typeof window !== 'undefined') {
        const [selectedMonth, setSelectedMonth] = useState(sessionStorage.getItem('selectedMonth') || '');
    }
    if (typeof window !== 'undefined') {
        // Access sessionStorage safely
        const [selectedMonth, setSelectedMonth] = useState(sessionStorage.getItem('selectedMonth') || '');
    }
    // @ts-ignore
    const handleMonthClick = (month) => {
        // First clear the previous selection
        // @ts-ignore
        setSelectedMonth(month);
        sessionStorage.removeItem('selectedMonth');
        // Immediately set the new month
        sessionStorage.setItem('selectedMonth', month);
        // Additional actions on selection, if needed
    };

    const handleNext = () => {
        setVisibleStartIndex((prevIndex) =>
            prevIndex + maxVisibleButtons < months.length ? prevIndex + maxVisibleButtons : prevIndex
        );
    };

    const handlePrev = () => {
        setVisibleStartIndex((prevIndex) =>
            prevIndex - maxVisibleButtons >= 0 ? prevIndex - maxVisibleButtons : prevIndex
        );
    };

    return (
        <div className="flex items-center justify-center gap-2">
            <Button onClick={handlePrev} disabled={visibleStartIndex === 0} className="disabled:opacity-50">
                {"<"}
            </Button>
            {months
                .slice(visibleStartIndex, visibleStartIndex + maxVisibleButtons)
                .map((month) => (
                    <Button
                        key={month}
                        onClick={() => handleMonthClick(month)}
                        className="px-4 py-2 border rounded-md shadow-sm text-sm font-medium
                                    bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white
                                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        {month}
                    </Button>
                ))
            }
            <Button
                onClick={handleNext}
                disabled={visibleStartIndex + maxVisibleButtons >= months.length}
                className="disabled:opacity-50"
            >
                {">"}
            </Button>
        </div>
    );
}
