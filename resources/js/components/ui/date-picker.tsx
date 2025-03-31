import * as React from "react"
import { format, getMonth, set, setMonth, setYear } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  tabIndex?: number
}

export function DatePicker({ tabIndex }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | null>(null)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date ?? new Date(), months.indexOf(month))
    setDate(newDate)

  }

  const handleYearChange = (year: string) => {
    const newDate = setYear(date ?? new Date(), parseInt(year))
    setDate(newDate)
  }


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal rounded-md",
            !date && "text-muted-foreground"
          )}
          tabIndex={tabIndex}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a birthday</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex p-3 gap-x-2">
          <Select onValueChange={handleMonthChange} value={date ? months[getMonth(date)] : undefined}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectGroup>
                {months.map((month, index) => (
                  <SelectItem key={index} value={month}>{month}</SelectItem>
                ))}

              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange} value={date ? date.getFullYear().toString() : ""}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectGroup>
                {years.map((year, index) => (
                  <SelectItem key={index} value={year.toString()}>{year}</SelectItem>
                ))}

              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={(date) => date && setDate(date)}
          initialFocus
          month={date ?? undefined}
          className="max-h-70"
          onMonthChange={setDate}
        />
      </PopoverContent>
    </Popover>
  )
}
