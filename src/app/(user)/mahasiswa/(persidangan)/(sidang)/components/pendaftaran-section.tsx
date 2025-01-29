import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import CardPendaftaran from "./pendaftaran-components/card-pendaftaran";

import CardPembayaran from "./pendaftaran-components/card-pembayaran";

export default function PendaftaranSection() {
  return (
    <div className="w-full pb-6">
      <br />
      <Typography.H2>Detail Pendaftaran Perkara</Typography.H2>
      <Separator />
      <CardPendaftaran />
      <CardPembayaran />
    </div>
  );
}
