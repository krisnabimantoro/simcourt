import * as React from "react";

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
import GetFetchingDataSelected from "@/lib/fetching-component-get-selected";
import { GetIdUser } from "@/lib/get-id-user";
import GetFetchingData from "@/lib/fetching-component-get";

export default async function CardClass() {
  const getUser = await GetFetchingData("v1/auth/me");
  const classId = getUser.data.kelas_id;

  const response = await GetFetchingDataSelected("v1/classes", classId);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{response.data.name}</CardTitle>
        <CardDescription>{response.data.code}</CardDescription>
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
