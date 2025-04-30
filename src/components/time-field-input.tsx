"use client";

import { useEffect, useState } from "react";
import { TimeField, DateInput } from "@/components/ui/datefield-rac";
import { Label } from "react-aria-components";
import { parseTime, Time } from "@internationalized/date";

interface InputProps {
  label: string;
  name: string;
  value?: string; // format: "HH:mm"
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ComponentTimeField({ label, name, value, onChange }: InputProps) {
  const [time, setTime] = useState<Time | null>(value ? parseTime(value) : null);

  useEffect(() => {
    if (value) {
      setTime(parseTime(value));
    }
  }, [value]);

  const handleTimeChange = (newTime: Time | null) => {
    setTime(newTime);

    if (onChange && newTime) {
      const fakeEvent = {
        target: {
          name,
          value: `${String(newTime.hour).padStart(2, "0")}:${String(newTime.minute).padStart(2, "0")}`,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(fakeEvent);
    }
  };

  return (
    <TimeField value={time} onChange={handleTimeChange} className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <DateInput />
    </TimeField>
  );
}
