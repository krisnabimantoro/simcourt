import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";
const items = [
  {
    id: 1,
    nama_dokumen: "Surat Gugatan",
    dokumen_elektronik: {
      judul: "Dokumen Gugatan",
      diinput_oleh: "Nama Lengkap User (peran)",
      tanggal: "03-01-2024 14:07 WIB",
      file: "PDF",
    },
    verifikasi: "Belum Verifikasi",
    keterangan: "Keterangan ditulis apabila Instruktur ingin memberikan catatan revisi, dll untuk berkasnya.",
  },
  {
    id: 2,
    nama_dokumen: "Perbaikan Gugatan",
    dokumen_elektronik: {
      judul: "Gugatan",
      diinput_oleh: "Nama Lengkap User (peran)",
      tanggal: "14-03-2024 12:37 WIB",
      file: "dokumen_persidangan_1710394679_724120.docx",
    },
    verifikasi: "Belum Verifikasi",
    keterangan: "",
  },
  {
    id: 3,
    nama_dokumen: "Penetapan Hakim/Majelis Hakim",
    dokumen_elektronik: {
      judul: "Penetapan Hakim Majelis Hakim",
      diinput_oleh: "Nama Lengkap User (peran)",
      tanggal: "08-08-2024 09:07 WIB",
      file: "PDF",
    },
    verifikasi: "Verifikasi",
    keterangan: "",
  },
  {
    id: 4,
    nama_dokumen: "Penunjukan Panitera Pengganti",
    dokumen_elektronik: {
      judul: "Penunjukan Panitera Pengganti",
      diinput_oleh: "Nama Lengkap User (peran)",
      tanggal: "12-08-2024 07:08 WIB",
      file: "PDF",
    },
    verifikasi: "Tidak Valid",
    keterangan: "",
  },
  {
    id: 5,
    nama_dokumen: "Penunjukan Jurusita/JSP",
    dokumen_elektronik: {
      judul: "Penunjukan Jurusita JSP",
      diinput_oleh: "Nama Lengkap User (peran)",
      file: "PDF",
    },
    verifikasi: "Belum Verifikasi",
    keterangan: "",
  },
];

export default function DokumenSection() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Nama Kelompok</CardTitle>
          <CardDescription>Kelas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>No</TableHead>
                <TableHead>Nama Dokumen</TableHead>
                <TableHead>Dokumen Elektronik</TableHead>
                <TableHead>Verifikasi</TableHead>
                <TableHead className="">Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell className="font-medium">{item.nama_dokumen}</TableCell>
                  <TableCell>
                    <div className="">
                      <p>{item.dokumen_elektronik.judul}</p>
                      <p>{item.dokumen_elektronik.diinput_oleh}</p>
                      <p>{item.dokumen_elektronik.tanggal}</p>
                      <p className="py-2"><FileText /></p>
                      <Button className="">Tambah</Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.verifikasi === "Verifikasi" ? (
                      <Badge>Verifikasi</Badge>
                    ) : item.verifikasi === "Tidak Valid" ? (
                      <Badge variant={"destructive"}>Tidak Valid</Badge>
                    ) : (
                      <Badge variant={"outline"}>Belum Verifikasi</Badge>
                    )}
                  </TableCell>
                  <TableCell className="w-60">{item.keterangan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-transparent">
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
