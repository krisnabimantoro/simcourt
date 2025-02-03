"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileInputFormReq from "./file-input";
import { toast } from "@/hooks/use-toast";

interface ClientSelectClassProps {
  token: string;
  userId: string;
}

export default function DialogForm({ token, userId }: ClientSelectClassProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama_pengadilan: "",
    mahasiswa_id: "",
    pembiayaan_id: "",
    pembiayaan_status: "",
    ktp: null as File | null,
    sptm: null as File | null,
    sktm: null as File | null,
    skts: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("nama_pengadilan", formData.nama_pengadilan);
    formDataToSend.append("mahasiswa_id", userId);
    formDataToSend.append("pembiayaan_id", formData.pembiayaan_id);
    formDataToSend.append("pembiayaan_status", formData.pembiayaan_status);
    if (formData.ktp) formDataToSend.append("ktp", formData.ktp);
    if (formData.sptm) formDataToSend.append("sptm", formData.sptm);
    if (formData.sktm) formDataToSend.append("sktm", formData.sktm);
    if (formData.skts) formDataToSend.append("skts", formData.skts);

    try {
      // const response = await fetch("http://127.0.0.1:8020/api/v1/pendaftaran-sidang", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     // "Content-Type": "application/json",
      //     mode: "no-cors",
      //   },

      //   body: formDataToSend,
      // });

      // if (!response.ok) throw new Error("Gagal mengirim data");

      toast({ title: "Pendaftaran berhasil dibuat" });
      router.push("gugatan/advokat");
    } catch (error) {
      toast({ title: "Pendaftaran berhasil dibuat", variant: "destructive" });

    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8">
          <Plus /> Tambah Gugatan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>MEMILIH PENGADILAN TUJUAN MENDAFTAR PERKARA</DialogTitle>
          <form onSubmit={handleSubmit}>
            <Label>Mendaftar pada Pengadilan (Ketik Nama Kota)</Label>
            <Input name="nama_pengadilan" placeholder="Pilih Pengadilan" onChange={handleInputChange} />

            <Label>Pembiayaan Perkara</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, pembiayaan_status: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Status Pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nonProdeo">Sudah Membayar</SelectItem>
                <SelectItem value="prodeo">Prodeo</SelectItem>
              </SelectContent>
            </Select>

            {formData.pembiayaan_status === "prodeo" && (
              <div className="gap-2 flex flex-col">
                <FileInputFormReq label="KTP Pemohon" onChange={(file) => handleFileChange("ktp", file)} name={"ktp"} />
                <FileInputFormReq label="Surat Pernyataan Tidak Mampu" onChange={(file) => handleFileChange("sptm", file)} name={"sptm"} />
                <FileInputFormReq
                  label="Surat Keterangan Tidak Mampu (SKTM)"
                  onChange={(file) => handleFileChange("sktm", file)}
                  name={"sktm"}
                />
                <FileInputFormReq
                  label="Surat Keterangan Tunjangan Sosial Lainnya (bila ada)"
                  onChange={(file) => handleFileChange("skts", file)}
                  name={"skts"}
                />
              </div>
            )}

            <br />
            <Button type="submit">Lanjut Pendaftaran</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
