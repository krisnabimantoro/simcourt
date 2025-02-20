"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "./label";

interface InputProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputDateWIthLabel({ label, name, value, onChange }: InputProps) {
  const [date, setDate] = React.useState<Date | null>(value ? new Date(value) : null);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate || null);

    if (onChange) {
      const fakeEvent = {
        target: { name, value: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "" },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(fakeEvent);
    }
  };

  return (
    <div className="space-y-2 flex flex-col justify-start items-start">
      <Label htmlFor={name} className="mb-1">
        {label}
        <span className="text-destructive">*</span>
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon className="mr-2" />
            {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date || undefined} onSelect={handleDateChange} initialFocus />
        </PopoverContent>
      </Popover>

      {/* Hidden input to store the selected date */}
      <input type="hidden" name={name} value={date ? format(date, "yyyy-MM-dd") : ""} onChange={onChange} />
    </div>
  );
}
