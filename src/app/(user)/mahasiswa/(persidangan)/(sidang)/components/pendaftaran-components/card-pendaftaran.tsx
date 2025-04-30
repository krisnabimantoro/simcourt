import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import NEXT_PUBLIC_URL_FETCH from "@/constant/data-fetching";
import TokenSession from "@/hooks/token-session";
import GetFetchingDataSelected from "@/lib/fetching-component-get-selected";
import GetToken from "@/lib/get-token";
import { cn } from "@/lib/utils";
import { url } from "inspector";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CardPendaftaranProps {
  data: any;
}
export default function CardPendaftaran({ data }: CardPendaftaranProps) {
  console.log("Data Pendaftaran coy:", data);

  function fileUrl(filePath: string | null): string | undefined {
    if (!filePath) return undefined;
    const url = `${NEXT_PUBLIC_URL_FETCH}/storage/${filePath.replace("public/", "")}`;
    return url;
  }
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
          <Typography.P className={cn("text-muted-foreground")}>
            {new Date(data?.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Nomor Pendaftaran Online</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>{data?.no_pendaftaran}</Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Jenis Perkara</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>Backlog </Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Status Pendaftaran</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>Backlog</Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Pihak</Typography.H4>
          <div>
            <Typography.P className={cn("text-muted-foreground")}>
              <div className="flex">
                {data?.pendaftaran_sidang?.pihak?.map((element, index) => (
                  <div key={index} className="flex flex-col">
                    <p>
                      {index + 1}. {element.nama_lengkap} (Sebagai {element.status_pihak})
                    </p>
                    <p>{element.alamat}</p>
                    <p>No. Tlp: {element.telepon}</p>
                    <p>Email: {element.email}</p>
                  </div>
                ))}
              </div>
            </Typography.P>
          </div>

          <Typography.H4 className={cn("text-lg text-right")}>Kuasa Pemohon</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>Unknown</Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Kuasa Termohon</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>Unknown</Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>
            Kelengkapan Dokumen <br /> <span className={cn("text-sm text-destructive")}> (Hanya dapat dilhat user pengadilan)</span>
          </Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>
            <div className="flex flex-row">
              <p className="mr-2">KTP</p>
              <Link
                href={fileUrl(data?.pendaftaran_sidang?.advokat.file_dokumen_ktp) || "#"}
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </Link>
            </div>
          </Typography.P>

          <Typography.H4 className={cn("text-lg text-right")}>Dokumen Pendaftaran</Typography.H4>
          <div>
            <Typography.P className={cn("text-muted-foreground")}>
              <div className="flex flex-row">
                <p className="mr-2">SURAT PERMOHONAN</p>

                <Link
                  href={fileUrl(data?.pendaftaran_sidang?.advokat.file_dokumen_kta) || "#"}
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Download
                </Link>
              </div>
            </Typography.P>

            <Typography.P className={cn("text-muted-foreground")}>
              <div className="flex flex-row">
                <p className="mr-2">BUKTI</p>

                <Link
                  href={fileUrl(data?.pendaftaran_sidang?.advokat.file_dokumen_penyumpahan) || "#"}
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Download
                </Link>
              </div>
            </Typography.P>
          </div>

          <Typography.H4 className={cn("text-lg text-right")}>Nomor Perkara</Typography.H4>
          <Typography.P className={cn("text-muted-foreground")}>
            <div>
              <p>Unknown</p>
              <p>{new Date(data?.created_at).toLocaleDateString("en-GB")}</p>
            </div>
          </Typography.P>
        </div>
      </CardContent>
    </Card>
  );
}
