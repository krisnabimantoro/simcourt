import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2 } from "lucide-react";
// import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TableAnggota from "./table-anggota";
import Typography from "@/components/ui/typhography";
import InputSearchAnggota from "./input-search";

export default function CardAnggota() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            Anggota Kelompok{" "}
            <Dialog>
              <DialogTrigger asChild>
                <Settings2 className="hover:cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambahkan Anggota</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </DialogDescription>
                  <InputSearchAnggota/>
                  <TableAnggota />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
        <CardDescription>Kelompok A </CardDescription>
      </CardHeader>
      <CardContent>
        <Typography.H5>Koordinator</Typography.H5>
        <div className="flex justify-between text-sm">
          <p>Krisna Bimantoro</p>
          <p>202210370311254</p>
          <p>Hakim</p>
        </div>
      </CardContent>
      <CardFooter>
        <Typography.H5>Anggota Kelompok</Typography.H5>
      </CardFooter>
    </Card>
  );
}
