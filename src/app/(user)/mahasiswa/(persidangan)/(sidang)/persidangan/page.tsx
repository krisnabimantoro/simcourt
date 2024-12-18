import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendaftaranSection from "../components/pendaftaran-section";

export default function PendaftaranSidang() {
  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-2 mb-10">
      <Typography.H2 className="flex flex-col">
        Persidangan Perdata <p className="text-sm font-normal">Berikut adalah detail dari perkara online yang saudara daftarkan </p>
      </Typography.H2>
      <Separator />

      <Tabs defaultValue="pendaftaran" className=" mt-4">
        <Separator />
        <TabsList>
          <TabsTrigger value="pendaftaran">Pendaftaran</TabsTrigger>
          <TabsTrigger value="persidangan">Persidangan</TabsTrigger>
          <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          <TabsTrigger value="putusan">putusan</TabsTrigger>
        </TabsList>
        <TabsContent value="pendaftaran">
          <PendaftaranSection />
        </TabsContent>
        <TabsContent value="persidangan">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
