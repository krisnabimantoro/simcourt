import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CardClass() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hukum administrasi negara</CardTitle>
        <CardDescription>Kelas A</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant={"destructive"}>Batal Pilih Kelas</Button>
      </CardFooter>
    </Card>
  );
}
