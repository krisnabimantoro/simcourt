"use client"; // This makes it a Client Component

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"; // Optional for better UI feedback
import { useRouter } from "next/navigation";
import InputSearchComponents from "./input-search";

interface ClientSelectClassProps {
  classes: { id: string; name: string; code: string }[];
  token: string;
  userId: string;
}

export default function ClientSelectClass({ classes, token, userId }: ClientSelectClassProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast(); // Optional: Use a toast for better feedback
  const router = useRouter();
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;

  const handleUpdateClass = async (classId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/students/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ kelas_id: classId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update class");
      }
      router.refresh();
      toast({ title: "Class updated successfully", variant: "default" });
    } catch (error) {
      console.error("Error updating class:", error);
      toast({ title: "Error updating class", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const [search, setSearch] = useState("");

  const filteredClasses = classes.filter((cls) => cls.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-2">
        <div className="flex gap-2 mt-4 h-full">
          <div className="flex w-full">
            <InputSearchComponents onSearchChange={setSearch} />
          </div>
        </div>

        {filteredClasses.map((data) => (
          <AccordionItem value={data.id} key={data.id} className="rounded-lg border bg-background px-4 py-1">
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">{data.name}</AccordionTrigger>
            <AccordionContent className="pb-2 text-muted-foreground">
              <Card className="w-full my-2">
                <CardHeader>
                  <CardDescription className="hover:cursor-pointer" onClick={() => handleUpdateClass(data.id)}>
                    {loading ? "Updating..." : data.code}
                  </CardDescription>
                </CardHeader>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
