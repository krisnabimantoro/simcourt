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

const items = [
  {
    id: 1,
    nama: "Alex Thompson",
    alamat: "alex.t@company.com",
    telp_email: "San Francisco, US",
    persetujuan: "Accepted",
  },
];

export default function CardSaluranElektronik() {
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
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell className="font-medium">{item.nama}</TableCell>
                <TableCell>{item.alamat}</TableCell>
                <TableCell>{item.telp_email}</TableCell>
                <TableCell>
                  {item.persetujuan === "Accepted" ? (
                    <CircleCheck size={24} />
                  ) : item.persetujuan === "Not Accepted" ? (
                    <CircleAlert size={24} />
                  ) : (
                    <CircleHelp />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <UserPen className={cn("hover:cursor-pointer")} />
                    </DialogTrigger>
                    <DialogContent className="w-[800px]">
                      <DialogHeader>
                        <DialogTitle>Tambah Pihak</DialogTitle>
                        <DialogDescription>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat ipsa eius incidunt. Rem repellendus maiores iusto
                          quidem
                        </DialogDescription>
                        <Form action={""} className="">
                          <div className="flex  gap-x-2">
                            <div className="w-1/2 gap-y-4 flex flex-col">
                              <SelectWithLabel label={"Status Pihak"} placeholder={"Pilih Status Pihak"} />

                              <InputWithLabelReq
                                label={"Nama Lengkap"}
                                placeholder={"Input nama lengkap pengacara"}
                                name={"name"}
                                type={"text"}
                              />
                              <SelectWithLabel label={"Status Alamat"} placeholder={"Pilih Status Alamat"} />
                              <SelectWithLabel label={"Provinsi"} placeholder={"Pilih Provinsi"} />
                              <SelectWithLabel label={"Kabupaten"} placeholder={"Pilih Kabupaten"} />
                            </div>

                            <div className="w-1/2 gap-y-4 flex flex-col ">
                              <InputWithLabel label={"Email"} placeholder={"Input Email"} name={"email"} type={"email"} />

                              <InputWithLabel label={"Alamat"} placeholder={"Input Alamat Lengkap "} name={"alamat"} type={"text"} />
                              <InputWithLabel label={"Telepon"} placeholder={"Input No Telepon "} name={"notelp"} type={"text"} />

                              <SelectWithLabel label={"Status Kecamatan"} placeholder={"Pilih Kecamatan"} />
                              <SelectWithLabel label={"Status Kelurahan"} placeholder={"Pilih Kelurahan"} />
                            </div>
                          </div>
                          <Button className="w-full mt-4">Submit</Button>
                        </Form>
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
