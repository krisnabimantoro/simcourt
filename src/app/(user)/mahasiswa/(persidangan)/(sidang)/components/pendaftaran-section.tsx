import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import CardPendaftaran from "./pendaftaran-components/card-pendaftaran";

import CardPembayaran from "./pendaftaran-components/card-pembayaran";
import CardSaluranElektronik from "./pendaftaran-components/card-saluran-elektronik";
import CardPembayaranJuruSita from "./pendaftaran-components/card-pembayaran-juru-sita";
import CardPanggilanJuruSita from "./pendaftaran-components/card-panggilan-e-summon";

export default function PendaftaranSection() {
  return (
    <div className="w-full pb-6">
      <br />
      <Typography.H2>Detail Pendaftaran Perkara</Typography.H2>
      <Separator />
      <CardPendaftaran />
      <CardPembayaran />
      <CardSaluranElektronik />
      <CardPembayaranJuruSita />
      <CardPanggilanJuruSita/>
    </div>
  );
}
