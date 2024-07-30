import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PocketBase from 'pocketbase';
import {getPay} from "@/query/getPay";
import {getUserid} from "@/query/useUserid";

const pb = new PocketBase('https://short-eventually.pockethost.io/');
async function fetchData() {
    try {
        // @ts-ignore
        const res = await pb.collection('workhours').getFullList({
            filter: `user_id = "${sessionStorage.getItem('matchingUser')}"`,
        });
        return res;
    } catch (err) {
        // @ts-ignore
        throw new Error('Error fetching data:', err);
    }
}
fetchData()
console.log(sessionStorage.getItem('matchingUser'))
console.log(sessionStorage.getItem('selectedMonth'))


export function ShadSelect() {
    // @ts-ignore
    const handleSelectItemClick = (value) => {
        // Update sessionStorage with the selected value
        sessionStorage.setItem('selectedMonth', value);
    };
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Months</SelectLabel>
                    <SelectItem value="January" onClick={() => handleSelectItemClick('January')}>January</SelectItem>
                    <SelectItem value="February">February</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="June">June</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="August">August</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="December">December</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
