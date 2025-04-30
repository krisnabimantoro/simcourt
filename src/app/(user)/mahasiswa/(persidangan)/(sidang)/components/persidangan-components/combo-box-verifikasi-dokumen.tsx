"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

const frameworks = [
  { value: "Terverifikasi", label: "Terverifikasi" },
  { value: "Belum Diverifikasi", label: "Belum Diverifikasi" },
  { value: "Tidak valid", label: "Tidak valid" },
];

export function ComponentComboboxVerifikasi({
  token,
  persidangan_id,

  user,
  onUpdateSuccess,
}: {
  token: any;
  persidangan_id: any;
  user: any;
  
  onUpdateSuccess: () => void | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;

  console.log("user", user);
  const handleSelect = async (selectedRole: string) => {
    setValue(selectedRole);
    setOpen(false);

    try {
      const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/persidangan/${persidangan_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: selectedRole,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to update role");
      }

      const data = await res.json();

      toast({ title: "Status dokumen berhasil diganti", variant: "default" });
      onUpdateSuccess()
    } catch (error) {
      toast({ title: "Status dokumen gagal diganti", description: String(error), variant: "destructive" });
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-fit justify-between my-1">
          Pilih Status
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
