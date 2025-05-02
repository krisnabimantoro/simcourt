import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

interface PutusanSectionProps {
  token: string;
  id: string;
  data_user: any;
}

export default function CardPutusanAkhir({ token, id, data_user }: PutusanSectionProps) {
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;

  function fileUrl(filePath: string | null): string | undefined {
    if (!filePath) return undefined;
    const url = `${NEXT_PUBLIC_URL_FETCH}/storage/${filePath.replace("public/", "")}`;
    return url;
  }
  const [dataPutusan, setDataPutusan] = useState<any>(null);

  useEffect(() => {
    const fetchPutusan = async (): Promise<any> => {
      const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/keputusan-akhir/detail_pendaftaran:${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log("Data persidangan", response);
      return response.json();
    };

    const loadData = async () => {
      try {
        const result = await fetchPutusan();
        setDataPutusan(result.data);
      } catch (error) {
        console.error("Gagal ambil data pembayaran:", error);
      }
    };

    loadData();
  }, [id, token]);

  console.log("Data Putusan:", dataPutusan);

  return (
    <div>
      <Card >
        <CardHeader>
          <CardTitle>Putusan Akhir</CardTitle>
          <CardDescription>INFO PUTUSAN NOMOR: 99/Pdt.Bth/2018/PN Mjk</CardDescription>
        </CardHeader>

        <CardFooter>
          <Table className="rounded-md">
            <TableBody>
              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Tanggal Putusan</TableCell>
                <TableCell className="py-2">{dataPutusan?.tanggal_putusan}</TableCell>
              </TableRow>

              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Amar Putusan</TableCell>
                <TableCell className="py-2">
                  <div className="">{dataPutusan?.amar_putusan}</div>
                </TableCell>
              </TableRow>

              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Tanggal Minutasi</TableCell>
                <TableCell className="py-2 italic">{dataPutusan?.tanggal_minutasi || "Perkara belum minutasi"}</TableCell>
              </TableRow>

              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Tanggal BHT</TableCell>
                <TableCell className="py-2 italic">{dataPutusan?.tanggal_bht || "Perkara belum BHT"}</TableCell>
              </TableRow>

              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableCell className="bg-muted/50 py-2 font-medium">Salinan Putusan</TableCell>
                <TableCell className="py-2">
                  {dataPutusan?.file ? (
                    <a href={fileUrl(dataPutusan?.file)} target="_blank" rel="noopener noreferrer" className="flex space-x-2 items-center">
                      <FileText className="text-blue-600 cursor-pointer" />
                      <span className="text-sm text-muted-foreground">File salinan putusan akhir</span>
                    </a>
                  ) : (
                    <div className="text-sm italic text-muted-foreground">File salinan putusan belum tersedia</div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardFooter>
      </Card>
    </div>
  );
}
