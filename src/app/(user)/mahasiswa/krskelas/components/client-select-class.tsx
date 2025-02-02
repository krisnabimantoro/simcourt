"use client"; // This makes it a Client Component

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import url_fetch from "@/constant/data-fetching";
import { useToast } from "@/hooks/use-toast"; // Optional for better UI feedback
import { useRouter } from "next/navigation";

interface ClientSelectClassProps {
  classes: { id: string; name: string; code: string }[];
  token: string;
  userId: string;
}

export default function ClientSelectClass({ classes, token, userId }: ClientSelectClassProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast(); // Optional: Use a toast for better feedback
  const router = useRouter();
  const handleUpdateClass = async (classId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8020/api/v1/students/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
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

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {classes.map((data) => (
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
