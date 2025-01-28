import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export function CardClass() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hukum administrasi negara</CardTitle>
        <CardDescription>Kelas A</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
              <Button variant={"destructive"}>Batal Pilih Kelas</Button>
            </div>
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
              <AlertDialogAction className="bg-destructive">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
