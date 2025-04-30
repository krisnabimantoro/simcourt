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

export function ComponentComboboxDemo({
  mahasiswa_id,
  token,
  listGroups,
  user,
}: {
  mahasiswa_id: number;
  token: any;
  listGroups: any;
  user: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;

  console.log("user", user);
  const handleSelect = async (selectedRole: string) => {
    setValue(selectedRole);
    setOpen(false);

    try {
      const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/students/${mahasiswa_id}`, {
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
  console.log("List Groups card:", listGroups);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-fit justify-between my-1">
          {user ? frameworks.find((framework) => framework.value === user)?.label : "Pilih Role"}
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
