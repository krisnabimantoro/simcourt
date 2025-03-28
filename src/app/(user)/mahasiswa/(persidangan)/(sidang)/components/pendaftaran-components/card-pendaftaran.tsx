import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import url_fetch from "@/constant/data-fetching";
import TokenSession from "@/hooks/token-session";
import GetFetchingDataSelected from "@/lib/fetching-component-get-selected";
import GetToken from "@/lib/get-token";
import { cn } from "@/lib/utils";
import { url } from "inspector";
import Link from "next/link";
import { useParams } from "next/navigation";

// async function fetching(id: string) {
//   const token = GetToken();

//   const response = await fetch(`${url_fetch}/v1/detail-pendaftarans/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   const data = await response.json();
//   return data;
// }

interface CardPendaftaranProps {
  token: string;
  id: string;
  data: any;
}
export default function CardPendaftaran({ token, id, data }: CardPendaftaranProps) {
  // const url_fetch = process.env.URL_FETCH;

  // const response = await fetch(`${url_fetch}/v1/detail-pendaftarans/${id}`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  //   credentials: "include",
  // });

  // const data = await response.json();
  // console.log(data);

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Pendaftaran Perkara (e-Filing)</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="grid grid-cols-2 gap-2 justify-self-center mt-4">
          <Typography.H4 className={cn("text-lg text-right")}>Tanggal Pendaftaran</Typography.H4>
          <Typography.P className={cn("text-muted-foreground w-80")}>6 Agustus 2024</Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Nomor Pendaftaran Online</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>PN MLG-13082024NGC</Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Jenis Perkara</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>Permohonan </Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Status Pendaftaran</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>Perkara Terdaftar</Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Pihak</Typography.H4>
          <div>
            <Typography.P className={cn("text-muted-foreground")}>
              <div className="flex">
                <p>1. </p>
                <div className="flex flex-col">
                  <p>SULISTRYORINI (Sebagai Pemohon)</p>
                  <p>Alamat: Jl. Anjasmoro 009/011 Sisir Batu</p>
                  <p>No. Tlp: 081938643062</p>
                  <p>Email: sulisrini586@gmail.com</p>
                </div>
              </div>
            </Typography.P>
          </div>

          <Typography.H4 className={cn("text-lg text-right")}>Kuasa Pemohon</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>Nama Kuasa</Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Kuasa Termohon</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>Nama Kuasa</Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>
            Kelengkapan Dokumen <br /> <span className={cn("text-sm text-destructive")}> (Hanya dapat dilhat user pengadilan)</span>
          </Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>
            <div className="flex flex-row">
              <p className="mr-2">KTP</p>

              <Link href={""} className="text-blue-500">
                {" "}
                Download
              </Link>
            </div>
          </Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Dokumen Pendaftaran</Typography.H4>
          <div>
            <Typography.P className={cn("text-muted-foreground")}>
              <div className="flex flex-row">
                <p className="mr-2">SURAT PERMOHONAN</p>

                <Link href={""} className="text-blue-500">
                  {" "}
                  Download
                </Link>
              </div>
            </Typography.P>

            <Typography.P className={cn("text-muted-foreground")}>
              <div className="flex flex-row">
                <p className="mr-2">BUKTI</p>

                <Link href={""} className="text-blue-500">
                  {" "}
                  Download
                </Link>
              </div>
            </Typography.P>
          </div>

          <Typography.H4 className={cn("text-lg text-right")}>Nomor Perkara</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>
            <div>
              <p>208/Pdt.G/2024/PN Mlg</p>
              <p>13 Agustus 2024</p>
            </div>
          </Typography.P>
        </div>
      </CardContent>
    </Card>
  );
}
