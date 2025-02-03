import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Pencil, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

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

export default function SectionPersidangan() {
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>COURT CALENDAR/RENCANA</CardTitle>
          <CardDescription>PERSIDANGAN NOMOR: 625/Pdt.P/2024/PN Mlg</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <PlusCircle />
            Tambah Jadwal Persidangan
          </Button>
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
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    {item.tanggal_jam.split(" ")[0]}
                    {item.tanggal_jam.split(" ")[1]}
                  </TableCell>
                  <TableCell>
                    {item.tanggal_jam.split(" ")[2]} {item.tanggal_jam.split(" ")[3]}
                  </TableCell>
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
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PERSIDANGAN</CardTitle>
          <CardDescription>NOMOR: 625/Pdt.P/2024/PN Mlg</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          {items.map((item) => (
            <div key={item.id}>
              <div className="flex gap-10">
                <div className="w-1/4">
                  {
                    <div className="flex justify-end flex-col text-right">
                      <p className="">
                        {" "}
                        {item.tanggal_jam.split(" ")[0]}
                        {item.tanggal_jam.split(" ")[1]}
                      </p>
                      <p className="text-2xl">
                        {" "}
                        {item.tanggal_jam.split(" ")[2]} {item.tanggal_jam.split(" ")[3]}
                      </p>
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
                      Alasan di tunda: <span className="font-normal">{item.agendaTunda}</span>
                    </p>
                  </div>
                  <br />
                  <Separator />

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold ">📂 Dokumen Persidangan :</h2>
                    <div className="mt-2 text-gray-700">
                      <p>
                        <span className="font-semibold">1. Dokumen diupload oleh:</span>{" "}
                        <span className="text-red-600 font-semibold">Tergugat</span> -{" "}
                        <span className="text-blue-700">richboy_leo@yahoo.co.id</span>
                      </p>
                      <p>
                        <span className="font-semibold">Upload pada:</span> Senin, 15 Februari 2021 Jam : 21:20 WIB
                      </p>
                      <p>
                        <span className="font-semibold">Status Dokumen:</span>{" "}
                        <span className="text-blue-600">Verifikasi Majelis Hakim</span> /{" "}
                        <span className="text-red-500">Memerlukan Verifikasi Majelis Hakim</span>
                      </p>
                      <p>
                        <span className="font-semibold">Jenis:</span> Kesimpulan
                      </p>
                      <p>
                        <span className="font-semibold">Judul Dokumen:</span> Kesimpulan Tergugat
                      </p>
                      <p className="flex items-center gap-4 mt-2">
                        <span className="font-semibold">Dokumen:</span>
                        <button className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                          📄 Lihat Dokumen
                        </button>
                        <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                          📄 Lihat Dokumen
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
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
