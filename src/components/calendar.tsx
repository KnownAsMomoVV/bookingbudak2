"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DateRangePicker } from 'react-date-range'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '@/styles/DateRangePickerCustom.css'
import { cn } from '@/lib/utils';

const FormSchema = z.object({
    dateRange: z.object({
        startDate: z.date({
            required_error: "A start date is required.",
        }),
        endDate: z.date({
            required_error: "An end date is required.",
        }),
    }).superRefine((data, ctx) => {
        if (data.endDate <= data.startDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "End date must be after start date",
                path: ["endDate"],
            })
        }
    })
})

export function CalendarForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const [range, setRange] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const formattedData = {
            startDate: format(data.dateRange.startDate, "yyyy-MM-dd"),
            endDate: format(data.dateRange.endDate, "yyyy-MM-dd"),
        }

        alert(`Booking Dates:\nStart Date: ${formattedData.startDate}\nEnd Date: ${formattedData.endDate}`)

        // Save to the database or any other required operation
        console.log('Formatted Data:', formattedData)

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(formattedData, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Booking Dates</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                `${format(range[0].startDate, "PPP")} - ${format(range[0].endDate, "PPP")}`
                                            ) : (
                                                <span>Pick a date range</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <DateRangePicker
                                        ranges={range}
                                        onChange={(item) => {
                                            setRange([item.selection])
                                            field.onChange({ startDate: item.selection.startDate, endDate: item.selection.endDate })
                                        }}
                                        disabledDay={(date) => date < new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Select the start and end dates for your trip.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
