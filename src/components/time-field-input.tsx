"use client";

import { DateInput, TimeField } from "@/components/ui/datefield-rac";
import { Label } from "react-aria-components";

export default function ComponentTimeField() {
  return (
    <TimeField className="space-y-2">
      <Label className="text-sm font-medium text-foreground">Jam Sidang</Label>
      <DateInput />
     
    </TimeField>
  );
}
