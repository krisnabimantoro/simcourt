import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";

export default function PendaftaranSidang() {
  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-4 mb-10">
      <Typography.H2 className="flex flex-col">
        Detail Pendaftaran Perdata{" "}
        <p className="text-sm font-normal">
          Berikut adalah detail dari pendaftaran perkara online yang saudara daftarkan{" "}
        </p>
      </Typography.H2>
      <Separator />

      <br />
      <Typography.H3>Form data</Typography.H3>
      
    </div>
  );
}
