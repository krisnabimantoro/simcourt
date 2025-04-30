import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ModalPersidanganPertama from "./modal/summons-persidangan-pertama";
import { useEffect, useState } from "react";
import { Result } from "postcss";
import { useRouter } from "next/navigation";

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

export default function CardPanggilanJuruSita({ id, data, token, user }: { id: any; data: any; token: any; user: any }) {
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const [dataPanggilan, setDataPanggilan] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const fetchPembayaranData = async (): Promise<any> => {
    const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/panggilan-sidang/detail_pendaftaran:${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  };

  const loadData = async () => {
    try {
      const result = await fetchPembayaranData();
      setDataPanggilan(result.data);
      console.log("Data panggilan:", result);
    } catch (error) {
      console.error("Gagal ambil data pembayaran:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  console.log("Data Panggilan:", dataPanggilan.panggilan_sidangs);
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Panggilan (e-summons)</CardTitle>
        <CardDescription>Juru Sita</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex  space-x-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant={"default"}>Kirim Panggilan/Pemberitahuan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kirim Panggilan/Pemberitahuan</DialogTitle>
                <ModalPersidanganPertama
                  id_pendaftaratan={id}
                  data={data}
                  token={token}
                  user={user}
                  onUpdateSuccess={() => {
                    loadData();
                    setOpen(false);
                  }}
                />
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
            {dataPanggilan?.panggilan_sidangs?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <div className="items-start">
                    <p>Panggilan Sidang</p>
                    <p>Nomor: {item.nomor}</p>
                    <p className="text-green-70000">Tanggal Sidang: {item.tanggal_sidang}</p>
                    <p>Jam Sidang: {item.jam_sidang}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="items-start">
                    <p>
                      <span className="font-bold">Nama: </span>
                      {item.pihak.nama}
                    </p>
                    <p>
                      <span className="font-bold">Email: </span>
                      {item.pihak.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>
                      <span className="font-bold">Judul:</span>
                      {item.dokumen?.judul || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Pengiriman: </span>
                      <span>
                        Tanggal:{" "}
                        {new Date(item?.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }) || "N/A"}
                      </span>
                      <span>
                        , Jam:{" "}
                        {new Date(item?.created_at).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }) || "N/A"}
                      </span>
                    </p>
                    <p> Dikirim Oleh: {item.dokumen?.pengiriman?.dikirim_oleh || "N/A"}</p>
                    <br />
                    <p>
                      <span className="font-bold">Catatan Panggilan:</span>
                      <span>{item.catatan_panggilan || "N/A"}</span>
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
