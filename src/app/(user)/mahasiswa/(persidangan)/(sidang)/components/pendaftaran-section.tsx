import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import CardPendaftaran from "./pendaftaran-components/card-pendaftaran";
import CardPembayaran from "./pendaftaran-components/card-pembayaran";
import CardSaluranElektronik from "./pendaftaran-components/card-saluran-elektronik";
import CardPembayaranJuruSita from "./pendaftaran-components/card-pembayaran-juru-sita";
import CardPanggilanJuruSita from "./pendaftaran-components/card-panggilan-e-summon";

interface PendaftaranSectionProps {
  token: string;
  id: string;
}

export default function PendaftaranSection({ token, id }: PendaftaranSectionProps) {
  const [dataPendaftaran, setDataPendaftaran] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:8020/api/v1/detail-pendaftarans/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setDataPendaftaran(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Data Pendaftaran:", dataPendaftaran);
  return (
    <div className="w-full pb-6">
      <br />
      <Typography.H2>Detail Pendaftaran Perkara</Typography.H2>
      <Separator />
      <CardPendaftaran token={token} id={id} data={dataPendaftaran} />
      <CardPembayaran />
      <CardSaluranElektronik />
      <CardPembayaranJuruSita />
      <CardPanggilanJuruSita />
    </div>
  );
}
