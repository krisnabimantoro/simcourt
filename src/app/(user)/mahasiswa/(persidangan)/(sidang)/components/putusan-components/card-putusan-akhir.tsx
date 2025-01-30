import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function CardPutusanAkhir() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Putusan Akhir</CardTitle>
          <CardDescription>INFO PUTUSAN NOMOR: 99/Pdt.Bth/2018/PN Mjk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <Button>
              <Upload className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              Upload Salinan Putusan (.pdf)
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Table className="rounded-md">
            <TableBody>
              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Tanggal Putusan</TableCell>
                <TableCell className="py-2">Senin, 29 April 2019</TableCell>
              </TableRow>

              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Amar Putusan</TableCell>
                <TableCell className="py-2">
                  <div className="">
                    <h3 className="font-semibold italic">DALAM EKSEPSI :</h3>
                    <ul className="list-disc list-inside ml-4">
                      <li>Menolak Eksepsi dari Para Terlawan;</li>
                    </ul>

                    <h3 className="font-semibold italic mt-4">DALAM POKOK PERKARA :</h3>
                    <ul className="list-disc list-inside ml-4">
                      <li>
                        Menyatakan perlawanan yang diajukan oleh Pelawan tidak dapat diterima{" "}
                        <span className="italic">(Niet Ontvankelijke verklaard)</span>;
                      </li>
                      <li>
                        Menghukum Pelawan untuk membayar biaya perkara sebesar <span className="font-semibold">Rp.1.374.000</span>{" "}
                        <span className="italic">(satu juta tiga ratus tujuh puluh empat ribu rupiah)</span>;
                      </li>
                    </ul>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Tanggal Minutasi</TableCell>
                <TableCell className="py-2 italic">Perkara belum minutasi</TableCell>
              </TableRow>

              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Tanggal BHT</TableCell>
                <TableCell className="py-2 italic">Perkara belum BHT</TableCell>
              </TableRow>

              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Salinan Putusan</TableCell>
                <TableCell className="py-2">
                  <a href="#">
                    <div className="flex space-x-2 items-center">
                      <FileText />
                      <p className="text-blue-500">Putusan Sela</p>
                      <p className="text-blue-500">99/Pdt.Bth/2018/PN Mjk</p>
                    </div>
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardFooter>
      </Card>
    </div>
  );
}
