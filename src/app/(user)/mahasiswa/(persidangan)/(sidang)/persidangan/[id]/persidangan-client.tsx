"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typhography";
import { useEffect, useState } from "react";
import { Separator } from "react-aria-components";
import DokumenSection from "../../components/dokumen-section";
import PendaftaranSection from "../../components/pendaftaran-section";
import SectionPersidangan from "../../components/persidangan-section";
import PutusanSidang from "../../components/putusan-section";
import router from "next/router";
import { useParams } from "next/navigation";

interface PendaftaranProps {
  token: string;
  params: { id: string };
}

export default function PendaftaranSidangClient({ token, params }: PendaftaranProps) {
  const { id } = params; // Get the ID from the URL parameters
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pendaftaran"); // default

  if (!id || Array.isArray(id)) {
    throw new Error("Invalid or missing 'id' parameter");
  }
  console.log(id); // Log the ID to the console for debugging purposes
  console.log(token); // Log the token to the console for debugging purposes
  console.log("tes");

  useEffect(() => {
    const fetchDataUser = async (): Promise<any> => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/auth/me`, {
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

        setUser(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataUser();
  }, [token]);

  useEffect(() => {
    // ambil tab terakhir dari localStorage
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("activeTab", value); // simpan ke localStorage
  };

  // console.log("Data user", user);
  // console.log("Data jadwal", dataSidang);
  // console.log("Data persidangan", dataPersidangan);

  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-2 mb-10">
      <Typography.H2 className="flex flex-col">
        Persidangan Perdata
        <p className="text-sm font-normal">Berikut adalah detail dari perkara online yang saudara daftarkan</p>
      </Typography.H2>
      <Separator />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-4">
        <Separator />
        <TabsList>
          <TabsTrigger value="pendaftaran">Pendaftaran</TabsTrigger>
          <TabsTrigger value="persidangan">Persidangan</TabsTrigger>
          <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          <TabsTrigger value="putusan">Putusan</TabsTrigger>
        </TabsList>
        <TabsContent value="pendaftaran">
          <PendaftaranSection token={token} id={id} />
        </TabsContent>
        <TabsContent value="persidangan">
          <SectionPersidangan token={token} id={id} data_user={user} />
        </TabsContent>
        <TabsContent value="dokumen">
          <DokumenSection id_pendaftaratan={id} token={token} user={user} />
        </TabsContent>
        <TabsContent value="putusan">
          <PutusanSidang token={token} id={id} data_user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
