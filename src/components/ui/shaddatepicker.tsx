// Assuming these imports are correct and exist in your project
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define an interface for the component props
interface DatePickerProps {
    selectedDate?: Date;
    onDateChange: (newDate: Date) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
    // Use the prop `selectedDate` as the initial state
    const [date, setDate] = React.useState<Date | undefined>(selectedDate);

    // Update local state and notify parent component when the date changes
    const handleDateSelect = (newDate: Date) => {
        setDate(newDate);
        onDateChange(newDate); // Notify the parent component
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    // @ts-ignore
                    onSelect={handleDateSelect} // Use the new handler
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
