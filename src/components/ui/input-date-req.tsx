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
}

export function InputDateWIthLabel({ label }: InputProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="space-y-2 flex flex-col justify-start items-start">
      <Label className="mb-1">
        {label}
        <span className="text-destructive">*</span>
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
}
