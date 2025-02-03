import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

import { Dialog, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ModalPersidanganPertama from "./modal/summons-persidangan-pertama";

const items = [
  {
    id: 1,
    panggilan_sidang: {
      nomor: "625/Pdt.P/2024/PN Mlg",
      tanggal_sidang: "Selasa, 13 Agustus 2024",
      jam_sidang: "09.00 WIB",
    },
    penggugat: {
      nama: "SULISTYORINI",
      email: "sulisrini586@gmail.com",
    },
    dokumen: {
      judul: "Relaas Sidang",
      pengiriman: {
        tanggal: "Selasa, 06 Agustus 2024",
        jam: "15:12 WIB",
        dikirim_oleh: "MANUEL FLAVIO, S.H.",
      },
    },
    catatan_panggilan:
      "Sidang pertama, saat persidangan harap membawa bukti-bukti surat asli dan menghadirkan 2 (dua) orang saksi yang salah satu saksi dari pihak keluarga.",
  },
];
export default function CardPanggilanJuruSita() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Panggilan (e-summons)</CardTitle>
        <CardDescription>Juru Sita</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex  space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"default"}>Kirim Panggilan/Pemberitahuan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kirim Panggilan/Pemberitahuan</DialogTitle>
                <ModalPersidanganPertama/>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button variant={"outline"}>Cetak</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>No. </TableHead>
              <TableHead>Jenis Panggilan</TableHead>
              <TableHead>Pihak</TableHead>
              <TableHead>Dokumen Panggilan(Rp.)</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <div className="items-start">
                    <p>Panggilan Sidang</p>
                    <p>Nomor: {item.panggilan_sidang.nomor}</p>
                    <p className="text-green-70000">Tanggal Sidang: {item.panggilan_sidang.tanggal_sidang}</p>
                    <p>Jam Sidang: {item.panggilan_sidang.jam_sidang}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="items-start">
                    <p>
                      <span className="font-bold">Nama: </span>
                      {item.penggugat.nama}
                    </p>
                    <p>
                      <span className="font-bold">Email: </span>
                      {item.penggugat.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>
                      <span className="font-bold">Judul:</span>
                      {item.dokumen.judul}
                    </p>
                    <p>
                      <span className="font-bold">Pengiriman: </span>
                      <span>Tanggal: {item.dokumen.pengiriman.tanggal}</span>
                      <span>, Jam: {item.dokumen.pengiriman.jam}</span>
                    </p>
                    <p> Dikirim Oleh: {item.dokumen.pengiriman.dikirim_oleh}</p>
                    <br />
                    <p>
                      <span className="font-bold">Catatan Panggilan:</span>
                      <span>{item.catatan_panggilan}</span>
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Pencil className="hover:cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardFooter>
    </Card>
  );
}
