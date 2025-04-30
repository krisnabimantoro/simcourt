"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import NEXT_PUBLIC_URL_FETCH from "@/constant/data-fetching";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardPembayaran({ id, token }: { id: string; token: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/detail-pembayaran?detail_pendaftaran_id=${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        console.log("Response:", response);
        if (response.status === 401) {
          router.push("/auth");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await response.json();
        const pembayaran = json.data?.[0]; // Access the first item
        setData(pembayaran);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, router]);

  if (loading) return <Skeleton className="w-full h-100 rounded-full" />;
  if (error || !data) return <p className="text-red-500">Error: {error}</p>;

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Pembayaran (e-Payment)</CardTitle>
        <CardDescription>Detail pembayaran perkara</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator />

        <div className="grid grid-cols-2 gap-2 justify-self-center mt-4">
          <Typography.H4 className="text-lg text-right">Diterima Dari</Typography.H4>
          <Typography.P className="text-muted-foreground">{data.diterima_dari}</Typography.P>

          <Typography.H4 className="text-lg text-right">Panjar Perkara</Typography.H4>
          <Typography.P className="text-muted-foreground w-80">Rp. {Number(data.panjar_perkara).toLocaleString("id-ID")}</Typography.P>

          <Typography.H4 className="text-lg text-right">Status Pembayaran</Typography.H4>
          <Typography.P className="text-muted-foreground w-80">Sudah dibayar</Typography.P>

          <Typography.H4 className="text-lg text-right">Tanggal Pembayaran</Typography.H4>
          <Typography.P className="text-muted-foreground w-80">{data.tanggal_pembayaran}</Typography.P>

          <Typography.H4 className="text-lg text-right">Jam Pembayaran</Typography.H4>
          <Typography.P className="text-muted-foreground w-80">
            {new Date(data.jam_pembayaran).toLocaleTimeString("id-ID")} WIB
          </Typography.P>
        </div>
      </CardContent>
    </Card>
  );
}
