import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell,  TableHead, TableHeader, TableRow } from "@/components/ui/table";

const items = [
  {
    id: 1,
    tanggal_jam: "Selasa, 03-01-2024 14:07 WIB",
    agenda: "Pemeriksaan Saksi",
    keterangan: "Pemeriksaan Saksi oleh Hakim",
  },
];

export default function SectionPersidangan() {
  return (
    <div className="w-full">
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
                <TableHead>Keterangan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    {item.tanggal_jam.split(" ")[0] }
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

      <div className="flex">
        <div className="w-1/4">{/* 25% width content here */}</div>
        <div className="w-3/4">{/* 75% width content here */}</div>
      </div>
    </div>
  );
}
