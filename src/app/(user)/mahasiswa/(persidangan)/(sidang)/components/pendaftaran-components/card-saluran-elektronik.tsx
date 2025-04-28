import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleAlert, CircleCheck, CircleHelp, UserPen } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SelectWithLabel from "@/components/ui/select-with-label-req";
import InputWithLabel from "@/components/ui/input-with-label";
import InputWithLabelReq from "@/components/ui/input-with-label-req";
import Form from "next/form";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const items = [
  {
    id: 1,
    nama: "Alex Thompson",
    alamat: "alex.t@company.com",
    telp_email: "San Francisco, US",
    persetujuan: "Accepted",
  },
];

export const statusPihak = [
  {
    value: "setuju",
    label: "Setuju",
  },
  {
    value: "tidak_setuju",
    label: "Tidak Setuju",
  },
];

export default function CardSaluranElektronik({ id, token }: { id: any; token: any }) {
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const [pihak, setPihak] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();
  const fetchPihak = async (): Promise<any> => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/pihaks/detail_pendaftaran:${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPihak(data.data.pihaks); // store it in state
    } catch (error) {
      console.error("Failed to fetch pihak:", error);
    }
  };

  const patchStatusPihak = async (id_pihak: number, status: string): Promise<void> => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/pihaks/${id_pihak}/persetujuan`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          persetujuan: status,
        }),
      });

      if (!response.ok) {
        throw new Error(`Gagal mengubah status pihak: ${response.status}`);
      }

      const data = await response.json();

      toast({ title: "Status pihak berhasil diubah!", description: "Lihat icon untuk status pihak", variant: "default" });
      fetchPihak();
    } catch (error) {
      console.error("Error saat update status pihak:", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId !== null) {
      await patchStatusPihak(selectedId, selectedStatus);
    } else {
      console.error("Selected ID is null. Cannot update status.");
    }
  };

  useEffect(() => {
    fetchPihak();
  }, []); // Run only once on mount

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Persetujuan Pihak Menggunakan Saluran Elektronik</CardTitle>
        <CardDescription>
          Formulir Persetujuan Para Pihak Beracara secara elektronik dapat diunduh{" "}
          <span>
            <Link className="text-blue-500" href={"#"}>
              di sini
            </Link>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>No. </TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Telp & Email</TableHead>
              <TableHead>Persetujuan</TableHead>
              <TableHead className="">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pihak?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell className="font-medium">{item.nama_lengkap}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  {item.persetujuan === "setuju" ? (
                    <CircleCheck size={24} />
                  ) : item.persetujuan === "tidak_setuju" ? (
                    <CircleAlert size={24} />
                  ) : (
                    <CircleHelp />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <UserPen onClick={() => setSelectedId(item.id)} className={cn("hover:cursor-pointer")} />
                    </DialogTrigger>
                    <DialogContent className="w-[800px]">
                      <DialogHeader>
                        <DialogTitle>Status Pihak</DialogTitle>
                        <DialogDescription>
                          Silakan ubah status pihak sesuai dengan persetujuan yang telah diberikan. Pastikan untuk memilih status yang
                          sesuai sebelum mengirimkan formulir.
                        </DialogDescription>
                        <form onSubmit={handleSubmit} className="">
                          <div className="flex  gap-x-2">
                            <div className="w-full gap-y-4 flex flex-col">
                              <SelectWithLabel
                                label={"Status Pihak"}
                                placeholder={"Pilih Status Pihak"}
                                options={statusPihak}
                                onChange={(val) => setSelectedStatus(val)}
                              />
                            </div>
                          </div>
                          <DialogPrimitive.Close className="w-full">
                            <span>
                              <Button className="w-full mt-4">Submit</Button>
                            </span>
                          </DialogPrimitive.Close>
                        </form>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
