import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FilePlus, Gavel, Pencil, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ModalCourtCalendar from "./persidangan-components/modal-court-calendar";
import { useEffect, useState } from "react";
import router from "next/router";
import ModalDokumenPersidangan from "./persidangan-components/modal-dokumen-persidangan";
import ModalPutusanPersidangan from "./persidangan-components/modal-putusan-persidangan";

const items = [
  {
    id: 1,
    tanggal_jam: "Selasa, 03-01-2024 14:07 WIB",
    agenda: "Pemeriksaan Saksi",
    agendaTunda: "Pemeriksaan Saksi ditunda",
    keterangan:
      "Pemeriksaan Saksi oleh Hakim Pengawas dan Pihak Penggugat dan Tergugat 1 dan 2 serta saksi dari pihak Penggugat dan Tergugat 1 dan 2",
  },
];

interface PersidanganSectionProps {
  token: string;
  id: string;
  data_jadwal_sidang: any;
  data_persidangan: any;
  data_user: any;
}

export default function SectionPersidangan({ token, id, data_jadwal_sidang, data_persidangan, data_user }: PersidanganSectionProps) {
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const [error, setError] = useState<string | null>(null);
  const [dataSidang, setDataSidang] = useState<any>([]);
  const [dataPersidangan, setDataPersidangan] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  function fileUrl(filePath: string | null): string | undefined {
    if (!filePath) return undefined;
    const url = `${NEXT_PUBLIC_URL_FETCH}/storage/${filePath.replace("public/", "")}`;
    return url;
  }
  console.log("asdadas", data_user);
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>COURT CALENDAR/RENCANA</CardTitle>
          <CardDescription>PERSIDANGAN NOMOR: 625/Pdt.P/2024/PN Mlg</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"default"}>
                <PlusCircle />
                Tambah Jadwal Persidangan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>COURT CALENDAR/RENCANA</DialogTitle>

                <DialogDescription>Tambah Jadwal Persidangan</DialogDescription>
                <br />
                <ModalCourtCalendar id_persidangan={id} token={token} user={data_user} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>No. </TableHead>
                <TableHead>Hari & Tanggal</TableHead>
                <TableHead>Jam</TableHead>
                <TableHead>Agenda/Acara Sidang</TableHead>
                <TableHead className="w-1/2">Keterangan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data_jadwal_sidang.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.hari_tanggal}</TableCell>
                  <TableCell>{item.jam}</TableCell>
                  <TableCell>{item.agenda}</TableCell>
                  <TableCell>{item.keterangan}</TableCell>
                  <TableCell>
                    <Pencil className="hover:cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PERSIDANGAN</CardTitle>
          <CardDescription>NOMOR: 625/Pdt.P/2024/PN Mlg</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          {data_persidangan.map((item) => (
            <div key={item.persidangan_id} className={"mt-8"}>
              <div className="flex gap-10">
                <div className="w-1/4">
                  {
                    <div className="flex justify-end flex-col text-right">
                      <p className="">{item.hari_tanggal}</p>
                      <p className="text-2xl">{item.jam}</p>
                      <p className="text-red-600 text-sm">keterangan: {item.keterangan}</p>
                    </div>
                  }
                </div>
                <div className="w-3/4 rounded-lg bg-muted/60  p-2">
                  <div className="flex gap-2">
                    <Calendar width={20} />
                    <p className="font-semibold">
                      Agenda Sidang: <span className="font-normal">{item.agenda}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Calendar width={20} />
                    <p className="font-semibold">
                      Alasan di tunda: <span className="font-normal">{item.agendaTunda || "N/A"}</span>
                    </p>
                  </div>
                  <br />
                  <Separator />

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold ">📂 Dokumen Persidangan :</h2>
                    <div className="mt-2 text-gray-700">
                      <p>
                        <span className="font-semibold">1. Dokumen diupload oleh:</span>{" "}
                        <span className="text-red-600 font-semibold">{item.dokumen_persidangan?.diupload_oleh?.status || "N/A"}</span> -{" "}
                        <span className="text-blue-700">{item.dokumen_persidangan?.diupload_oleh?.email || "N/A"}</span>
                      </p>
                      <p>
                        <span className="font-semibold">Upload pada:</span>{" "}
                        {item.dokumen_persidangan?.diupload_pada?.tanggal_upload || "N/A"}{" "}
                        {item.dokumen_persidangan?.diupload_pada?.jam_upload || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Status Dokumen:</span>{" "}
                        <span className="text-blue-600">Verifikasi Majelis Hakim</span> /{" "}
                        <span className="text-red-500">{item.dokumen_persidangan?.status || "N/A"}</span>
                      </p>
                      <p>
                        <span className="font-semibold">Jenis:</span> {item.dokumen_persidangan?.jenis || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Judul Dokumen:</span>
                        {item.dokumen_persidangan?.judul_dokumen || "N/A"}
                      </p>
                      <p className="flex items-center gap-4 mt-2">
                        <span className="font-semibold">Upload Dokumen:</span>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant={"default"}>
                              <FilePlus />
                              Upload dokumen persidangan
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upload dokumen persidangan</DialogTitle>

                              <DialogDescription>Tambah data dokumen</DialogDescription>
                              <br />
                              <ModalDokumenPersidangan id_persidangan={item.persidangan_id} token={token} user={data_user} />
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </p>
                      <p className="flex items-center gap-4 mt-2">
                        <span className="font-semibold">Dokumen:</span>
                        <button
                          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                          onClick={() => window.open(fileUrl(item.dokumen_persidangan?.upload_dokumen || ""), "_blank")}
                        >
                          📄 Lihat Dokumen
                        </button>
                        <button
                          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                          onClick={() => window.open(fileUrl(item.dokumen_persidangan?.upload_dokumen || ""), "_blank")}
                        >
                          📄 Lihat Dokumen
                        </button>
                        <button className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                          Verifikasi Dokumen
                        </button>
                      </p>
                    </div>
                  </div>

                  <Separator />
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold  flex items-center gap-2">📘 Catatan Persidangan</h2>
                    <p className="mt-2 text-gray-700">
                      Oleh karena Penggugat belum mengajukan kesimpulan, maka Majelis Hakim memberikan kesempatan sekali lagi kepada
                      Penggugat untuk mengajukan kesimpulan. Sidang ditunda hari Selasa tanggal 23 Februari dengan acara kesimpulan.
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      ✍️ ditulis oleh: <span className="text-blue-700 font-semibold">MOHAMAD INDARTO, S.H., M.Hum</span> |{" "}
                      <span className="text-gray-600">2021-02-16 14:30:43</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"default"}>
            <Gavel />
            Putusan Akhir
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat putusan akhir</DialogTitle>

            <DialogDescription>Pastikan data terinput dengan benar, aksi ini hanya bisa dilakukan sekali</DialogDescription>
            <br />

            <ModalPutusanPersidangan id_persidangan={id} token={token} user={data_user} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Separator />
    </div>
  );
}
