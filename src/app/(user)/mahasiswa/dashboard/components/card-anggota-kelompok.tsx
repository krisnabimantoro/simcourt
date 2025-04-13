import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2 } from "lucide-react";
// import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TableAnggota from "./table-anggota";
import Typography from "@/components/ui/typhography";
import InputSearchAnggota from "./input-search";
import { ComponentComboboxDemo } from "./role-combobox";
import GetFetchingData from "@/lib/fetching-component-get";
import GetToken from "@/lib/get-token";

export default async function CardAnggota() {
  const responseMe = await GetFetchingData("v1/auth/me");
  const classId = responseMe.data.kelas_id;
  const response = await GetFetchingData(`v1/list-students/${classId}`);
  const userToken = await GetToken();

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
                  <TableAnggota response={response} userToken={userToken} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
        <CardDescription>Kelompok A </CardDescription>
      </CardHeader>
      <CardContent>
        <Typography.H5>Koordinator</Typography.H5>
        <div className="flex justify-between items-center text-sm">
          <p>Krisna Bimantoro</p>

          <ComponentComboboxDemo />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full">
          <Typography.H5>Anggota Kelompok</Typography.H5>
          <div className="flex justify-between items-center text-sm">
            <p>Krisna Bimantoro</p>
            <ComponentComboboxDemo />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
