"use client"; // Ensures this runs only on the client side

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendaftaranSection from "../components/pendaftaran-section";
import DokumenSection from "../components/dokumen-section";
import PutusanSidang from "../components/putusan-section";
import SectionPersidangan from "../components/persidangan-section";

export default function PendaftaranSidang() {
  const [selectedTab, setSelectedTab] = useState("pendaftaran");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTab = localStorage.getItem("lastOpenedTab");
      if (savedTab) {
        setSelectedTab(savedTab);
      }
    }
  }, []);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("lastOpenedTab", value);
    }
  };

  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-2 mb-10">
      <Typography.H2 className="flex flex-col">
        Persidangan Perdata
        <p className="text-sm font-normal">
          Berikut adalah detail dari perkara online yang saudara daftarkan
        </p>
      </Typography.H2>
      <Separator />

      <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={handleTabChange} className="mt-4">
        <Separator />
        <TabsList>
          <TabsTrigger value="pendaftaran">Pendaftaran</TabsTrigger>
          <TabsTrigger value="persidangan">Persidangan</TabsTrigger>
          <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          <TabsTrigger value="putusan">Putusan</TabsTrigger>
        </TabsList>
        <TabsContent value="pendaftaran">
          <PendaftaranSection />
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
