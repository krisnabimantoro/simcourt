import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CardPendaftaran() {
  return (
    <Card className="w-full">
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
