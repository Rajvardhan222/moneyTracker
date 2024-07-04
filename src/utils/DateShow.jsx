import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { monthsOfTheYear } from './month';
import { useSelector } from 'react-redux';
import { getMonthRange } from './getMonthRange';
function DateShow({month,setMonth}) {
    let createdAt = useSelector((store) => store.user.user.createdAt);
    let createdAtDate = new Date(createdAt);
  let today = new Date();
  
  return (
    <Select
            value={month}
            onValueChange={(e) => {
              setMonth(e);
            }}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {/* get the list of months from today month to account createdAt month */}
              {getMonthRange(createdAtDate, today).map((month, index) => (
                <SelectItem key={index} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
  )
}

export default DateShow