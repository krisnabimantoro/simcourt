"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const frameworks = [
  { value: "kuasa_hukum", label: "Kuasa Hukum" },
  { value: "hakim", label: "Hakim" },
  { value: "juru_sita", label: "Juru Sita" },
  { value: "panitera_pengganti", label: "Panitera Pengganti" },
  { value: "saksi", label: "Saksi" },
];

export function ComponentComboboxDemo({ mahasiswa_id, token }: { mahasiswa_id: number; token: any }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = async (selectedRole: string) => {
    setValue(selectedRole);
    setOpen(false);

    try {
      const res = await fetch(`http://127.0.0.1:8020/api/v1/students/${mahasiswa_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: selectedRole,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to update role");
      }

      const data = await res.json();
      console.log("Role updated successfully:", data);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-fit justify-between my-1">
          {value ? frameworks.find((framework) => framework.value === value)?.label : "Pilih Role"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder="Pilih Role" />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    handleSelect(currentValue);
                  }}
                >
                  {framework.label}
                  <Check className={cn("ml-auto", value === framework.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
