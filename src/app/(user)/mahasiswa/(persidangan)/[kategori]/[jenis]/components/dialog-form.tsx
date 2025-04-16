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
import Link from "next/link";

interface ClientSelectClassProps {
  token: string;
  userId: number;
  kategoriSidang: string;
  jenisSidang: string;
}

export default function DialogForm({ token, userId, kategoriSidang, jenisSidang }: ClientSelectClassProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama_pengadilan: "",
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
    const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
    formDataToSend.append("nama_pengadilan", formData.nama_pengadilan);
    formDataToSend.append("mahasiswa_id", userId);
    formDataToSend.append("pembiayaan_id", formData.pembiayaan_id);
    if (formData.ktp) formDataToSend.append("ktp", formData.ktp);
    if (formData.sptm) formDataToSend.append("sptm", formData.sptm);
    if (formData.sktm) formDataToSend.append("sktm", formData.sktm);
    if (formData.skts) formDataToSend.append("skts", formData.skts);

    try {
      const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/pendaftaran-sidang`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Keep only Authorization header
        },
        credentials: "include",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try getting error details
        throw new Error(errorData?.message || "Gagal mengirim data");
      }

      toast({ title: "Pendaftaran berhasil dibuat" });
      console.log(response);
      console.log(jenisSidang);
      const data = await response.json();
      const pendaftaranId = data.data.id;
      router.push(`${jenisSidang}/advokat/${pendaftaranId}`); // ✅ Fixed missing `/`
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
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
            <Input name="nama_pengadilan" placeholder="Pilih Pengadilan" onChange={handleInputChange} required />

            <Label>Pembiayaan Perkara</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, pembiayaan_id: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Status Pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Sudah Membayar</SelectItem>
                <SelectItem value="2">Prodeo</SelectItem>
              </SelectContent>
            </Select>

            {formData.pembiayaan_id === "2" && (
              <div className="gap-2 flex flex-col">
                <FileInputFormReq label="KTP Pemohon" onChange={(file) => handleFileChange("ktp", file)} name="ktp" />
                <FileInputFormReq label="Surat Pernyataan Tidak Mampu" onChange={(file) => handleFileChange("sptm", file)} name="sptm" />
                <FileInputFormReq
                  label="Surat Keterangan Tidak Mampu (SKTM)"
                  onChange={(file) => handleFileChange("sktm", file)}
                  name="sktm"
                />
                <FileInputFormReq
                  label="Surat Keterangan Tunjangan Sosial Lainnya (bila ada)"
                  onChange={(file) => handleFileChange("skts", file)}
                  name="skts"
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
