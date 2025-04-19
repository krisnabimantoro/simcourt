"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";

const items = [
  { id: 1, nama_dokumen: "Surat Gugatan" },
  { id: 2, nama_dokumen: "Perbaikan Gugatan" },
  { id: 3, nama_dokumen: "Penetapan Hakim/Majelis Hakim" },
  { id: 4, nama_dokumen: "Penunjukan Panitera Pengganti" },
  { id: 5, nama_dokumen: "Penunjukan Jurusita/JSP" },
];

export default function DokumenSection({ id_pendaftaratan, token }: { id_pendaftaratan: any; token: any }) {
  const [selectedDokumenId, setSelectedDokumenId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const handleUpload = async (item: (typeof items)[0]) => {
    if (!file) return alert("Silakan pilih file terlebih dahulu");

    const formData = new FormData();
    formData.append("detail_pendaftaran_id", id_pendaftaratan);
    formData.append("nama_dokumen", item.nama_dokumen);
    formData.append("diupload_oleh", "John Doe");
    formData.append("peran", "Kuasa Hukum");
    formData.append("status", "Belum terverifikasi");
    formData.append("keterangan", `Dokumen ${item.nama_dokumen} terkait perkara No. 123/PDT/2024`);
    formData.append("file", file);

    try {
      const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/dokumen-permohonan`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      alert("Upload berhasil!");
      setSelectedDokumenId(null); // reset
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Gagal mengupload dokumen");
    }
  };

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
                    <div>
                      <p>{item.dokumen_elektronik?.judul || "N/A"}</p>
                      <p>{item.dokumen_elektronik?.diinput_oleh || "N/A"}</p>
                      <p>{item.dokumen_elektronik?.tanggal || "N/A"}</p>
                      <p className="py-2">
                        <FileText />
                      </p>
                      <Button onClick={() => setSelectedDokumenId(item.id)}>Tambah</Button>

                      {selectedDokumenId === item.id && (
                        <div className="mt-2">
                          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                          <Button className="mt-2" onClick={() => handleUpload(item)}>
                            Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.verifikasi === "Verifikasi" ? (
                      <Badge>Verifikasi</Badge>
                    ) : item.verifikasi === "Tidak Valid" ? (
                      <Badge variant="destructive">Tidak Valid</Badge>
                    ) : (
                      <Badge variant="outline">Belum Verifikasi</Badge>
                    )}
                  </TableCell>
                  <TableCell className="w-60">{item.keterangan || "N/A"}</TableCell>
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
