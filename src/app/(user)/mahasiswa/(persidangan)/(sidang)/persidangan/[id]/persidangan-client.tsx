"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typhography";
import { useEffect, useState } from "react";
import { Separator } from "react-aria-components";
import DokumenSection from "../../components/dokumen-section";
import PendaftaranSection from "../../components/pendaftaran-section";
import SectionPersidangan from "../../components/persidangan-section";
import PutusanSidang from "../../components/putusan-section";

import { useParams } from "next/navigation";

interface PendaftaranProps {
    token: string;
    params: { id: string };
}
export default function PendaftaranSidangClient({ token, params }: PendaftaranProps) {
  const { id } = params; // Get the ID from the URL parameters
  if (!id || Array.isArray(id)) {
    throw new Error("Invalid or missing 'id' parameter");
  }
  console.log(id); // Log the ID to the console for debugging purposes
  console.log(token); // Log the token to the console for debugging purposes
  console.log("tes");

  //   const [selectedTab, setSelectedTab] = useState("pendaftaran");

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       const savedTab = localStorage.getItem("lastOpenedTab");
  //       if (savedTab) {
  //         setSelectedTab(savedTab);
  //       }
  //     }
  //   }, []);

  //   const handleTabChange = (value: string) => {
  //     setSelectedTab(value);
  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("lastOpenedTab", value);
  //     }
  //   };

  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-2 mb-10">
      <Typography.H2 className="flex flex-col">
        Persidangan Perdata
        <p className="text-sm font-normal">Berikut adalah detail dari perkara online yang saudara daftarkan</p>
      </Typography.H2>
      <Separator />

      <Tabs defaultValue={"pendaftaran"}  className="mt-4">
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
          <SectionPersidangan />
        </TabsContent>
        <TabsContent value="dokumen">
          <DokumenSection />
        </TabsContent>
        <TabsContent value="putusan">
          <PutusanSidang />
        </TabsContent>
      </Tabs>
    </div>
  );
}
