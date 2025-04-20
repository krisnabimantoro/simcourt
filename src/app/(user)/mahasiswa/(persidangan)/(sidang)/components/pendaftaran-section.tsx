import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import CardPendaftaran from "./pendaftaran-components/card-pendaftaran";
import CardPembayaran from "./pendaftaran-components/card-pembayaran";
import CardSaluranElektronik from "./pendaftaran-components/card-saluran-elektronik";
import CardPembayaranJuruSita from "./pendaftaran-components/card-pembayaran-juru-sita";
import CardPanggilanJuruSita from "./pendaftaran-components/card-panggilan-e-summon";
import router from "next/router";

interface PendaftaranSectionProps {
  token: string;
  id: string;
}

export default function PendaftaranSection({ token, id }: PendaftaranSectionProps) {
  const [dataPendaftaran, setDataPendaftaran] = useState<any>(null);
  const [idPendaftaranSidang, setIdPendaftaranSidang] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/detail-pendaftarans/${id}`, {
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

        if (response.status === 401) {
          router.push("/auth");
          return;
        }

        const data = await response.json();
        setDataPendaftaran(data);
        setIdPendaftaranSidang(data.data.pendaftaran_sidang_id);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, token]);

  console.log("Data Pendaftaranasd:", idPendaftaranSidang);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // console.log("Data Pendaftaran:", dataPendaftaran);
  return (
    <div className="w-full pb-6">
      <br />
      <Typography.H2>Detail Pendaftaran Perkara</Typography.H2>
      <Separator />
      <CardPendaftaran data={dataPendaftaran} />
      <CardPembayaran id={id} token={token} />
      <CardSaluranElektronik id={id} token={token} />
      <CardPembayaranJuruSita token={token} id={id} />
      <CardPanggilanJuruSita id={id} data={dataPendaftaran} token={token} />
    </div>
  );
}
