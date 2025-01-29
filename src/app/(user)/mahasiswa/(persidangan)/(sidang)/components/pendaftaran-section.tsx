import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import CardPendaftaran from "./(pendaftaran-components)/card-pendaftaran";

export default function PendaftaranSection() {
  return (
    <div className="w-full">
      <br />
      <Typography.H3>Detail Pendaftaran Perkara</Typography.H3>
      <Separator />
      <CardPendaftaran />
    </div>
  );
}
