"use client"; // Client Component

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog-kelas";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CardClassClientProps {
  classData: { id: string; name: string; code: string };
  token: string;
  userId: string;
}

export default function CardClassClient({ classData, token, userId }: CardClassClientProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const url = process.env.NEXT_PUBLIC_URL_FETCH;

  const router = useRouter();
  const handleUpdateClass = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/students/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ kelas_id: null }),
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{classData.name}</CardTitle>
        <CardDescription>{classData.code}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Batal Pilih Kelas</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah kamu yakin ingin menghapus kelas?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Ini akan secara permanen menghapus data kelas.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive" onClick={() => handleUpdateClass()}>
                {loading ? "Processing..." : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
