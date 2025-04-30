"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const items = [
  { id: 1, nama_dokumen: "Surat Gugatan" },
  { id: 2, nama_dokumen: "Perbaikan Gugatan" },
  { id: 3, nama_dokumen: "Penetapan Hakim/Majelis Hakim" },
  { id: 4, nama_dokumen: "Penunjukan Panitera Pengganti" },
  { id: 5, nama_dokumen: "Penunjukan Jurusita/JSP" },
];

const frameworks = [
  { value: "kuasa_hukum", label: "Kuasa Hukum" },
  { value: "hakim", label: "Hakim" },
  { value: "juru_sita", label: "Juru Sita" },
  { value: "panitera_pengganti", label: "Panitera Pengganti" },
  { value: "saksi", label: "Saksi" },
];

export default function DokumenSection({ id_pendaftaratan, token,user }: { id_pendaftaratan: any; token: any ,user:any}) {
  const [selectedDokumenId, setSelectedDokumenId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const [dokumenData, setDokumenData] = useState<any[]>([]);
  const [detailPendaftaran, setDetailPendaftaran] = useState<any>(null);

  function fileUrl(filePath: string | null): string | undefined {
    if (!filePath) return undefined;
    const url = `${NEXT_PUBLIC_URL_FETCH}/storage/${filePath.replace("public/", "")}`;
    return url;
  }
  const router = useRouter();

  console.log("user datadokumen" , user);
  const handleUpload = async (item: (typeof items)[0]) => {
    if (!file) return toast({ title: "Silahkan upload file dahulu", variant: "destructive" });;

    const formData = new FormData();
    formData.append("detail_pendaftaran_id", id_pendaftaratan);
    formData.append("nama_dokumen", item?.nama_dokumen);
    formData.append("diupload_oleh", user?.name || ""); // Assuming user.name is the uploader's name
    formData.append("peran", user?.role || ""); // Assuming user.role is the uploader's role
    formData.append("status", "Belum terverifikasi");
    // formData.append("keterangan", ``);
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
      toast({ title: "Dokumen berhasil di upload", description: "Tekan icon dokumen untuk melihat dokumen", variant: "default" });
      setSelectedDokumenId(null); // reset
      setFile(null);
      fetchDokumen();
    } catch (error) {
      console.error(error);
      toast({ title: "Gagal upload dokumen di upload", description: String(error), variant: "destructive" });
    }
  };

  async function fetchDokumen() {
    try {
      const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/dokumen-permohonan/detail_pendaftaran:${id_pendaftaratan}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();

      const dokumenList = result.data.dokumen || [];
      const detail = result.data.detail_pendaftaran || null;

      // Gabungkan dokumen dengan items berdasarkan nama_dokumen
      const merged = items.map((item) => {
        const relatedDokumen = dokumenList.filter((dok) => dok.nama_dokumen === item.nama_dokumen);
        return {
          ...item,
          dokumen_elektronik: relatedDokumen.length > 0 ? relatedDokumen[0] : null,
          verifikasi: relatedDokumen.length > 0 ? relatedDokumen[0].status : null,
          keterangan: relatedDokumen.length > 0 ? relatedDokumen[0].keterangan : null,
        };
      });

      setDokumenData(merged);
      setDetailPendaftaran(detail);
    } catch (error) {
      console.error("Failed to fetch dokumen:", error);
    }
  }
  useEffect(() => {
    fetchDokumen();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{detailPendaftaran?.no_pendaftaran || "Nama Kelompok"}</CardTitle>
          <CardDescription>{detailPendaftaran?.kelas || "Kelas"}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>No</TableHead>
                <TableHead>Nama Dokumen</TableHead>
                <TableHead>Dokumen Elektronik</TableHead>
                <TableHead>Verifikasi</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dokumenData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell className="font-medium">{item.nama_dokumen}</TableCell>
                  <TableCell>
                    {item.dokumen_elektronik ? (
                      <div>
                        <p>{item?.dokumen_elektronik?.diupload_oleh}</p>
                        <p>
                        {item?.dokumen_elektronik?.peran ? frameworks.find((framework) => framework.value === item.dokumen_elektronik.peran)?.label : "N/A"}

                        </p>
                        <p>{new Date(item.dokumen_elektronik.created_at).toLocaleDateString()}</p>
                        <p className="py-2">
                          <a href={fileUrl(item?.dokumen_elektronik?.file_path)} target="_blank" rel="noopener noreferrer">
                            <FileText className="text-blue-600 cursor-pointer" />
                          </a>
                        </p>
                        <div className="mt-2">
                          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                          <Button className="mt-2" onClick={() => handleUpload(item)}>
                            Upload
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        <Button className="mt-2" onClick={() => handleUpload(item)}>
                          Upload
                        </Button>
                      </div>
                    )}
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
          
          </Table>
        </CardContent>

      </Card>
    </div>
  );
}
