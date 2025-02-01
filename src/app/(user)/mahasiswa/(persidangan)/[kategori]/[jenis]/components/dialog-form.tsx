"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { useRouter } from "next/navigation";
import FileInputForm from "@/components/ui/file-input";

export default function DialogForm() {
  const router = useRouter();
  const handleRoute = () => {
    router.push("gugatan/advokat");
  };

  const [selectedValue, setSelectedValue] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8">
          <Plus /> Tambah Gugatan
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>MEMILIH PENGADILAN TUJUAN MENDAFTAR PERKARA</DialogTitle>

          <br />
          <Label>Mendaftar pada Pengadilan (Ketik Nama Kota)</Label>
          <Input placeholder="Pilih Pengadilan atau Ketik Nama Kota Untuk Mencari Cepat" />
          <br />

          <Label>Pembiayaan Perkara</Label>

          <Select onValueChange={(value) => setSelectedValue(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Status Pembayaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nonProdeo">Sudah Membayar</SelectItem>
              <SelectItem value="prodeo">Prodeo</SelectItem>
            </SelectContent>
          </Select>

          {selectedValue === "prodeo" && (
            <div className="gap-2 flex flex-col">
              <Separator />
              <FileInputForm label={"KTP Pemohon"} />
              <FileInputForm label={"Surat Pernyataan Tidak Mampu"} />
              <FileInputForm label={"Surat Keterangan Tidak Mampu (SKTM)"} />
              <FileInputForm label={"Surat Keterangan Tunjangan Sosial Lainnya (bila ada)"} />
            </div>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={handleRoute}>
            Lanjut Pendaftaran
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
