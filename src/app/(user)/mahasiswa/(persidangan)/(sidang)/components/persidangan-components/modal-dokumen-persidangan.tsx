import { Label } from "@/components/ui/label";
import Form from "next/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InputWithLabel from "@/components/ui/input-with-label";
import { InputDateWIthLabel } from "@/components/ui/input-date-req";
import ComponentTimeField from "@/components/time-field-input";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import InputWithLabelReq from "@/components/ui/input-with-label-req";
import FileInputFormReq from "../../../[kategori]/[jenis]/components/file-input";

export default function ModalDokumenPersidangan({
  id_persidangan,
  token,
  user,
  dokumen_upload,
}: {
  id_persidangan: any;
  token: any;
  user: any;
  dokumen_upload?: any;
}) {
  console.log("ID persidangan:", id_persidangan);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;

  console.log("User data:", user);
  const [form, setForm] = useState({
    persidangan_id: id_persidangan,
    diupload_oleh_status: user?.status,
    diupload_oleh_email: user?.email,
    status: "Belum Terverifikasi",
    jenis: "",
    judul_dokumen: "",
    catatan: "",
    upload_dokumen: null as File | null,
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setForm((prev) => ({ ...prev, [name]: file }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("persidangan_id", form.persidangan_id.toString());
    formData.append("diupload_oleh_status", form.diupload_oleh_status || "");
    formData.append("diupload_oleh_email", form.diupload_oleh_email || "");
    formData.append("status", form.status);
    formData.append("jenis", form.jenis);
    formData.append("judul_dokumen", form.judul_dokumen);
    formData.append("catatan", form.catatan);
    if (form.upload_dokumen) {
      formData.append("upload_dokumen", form.upload_dokumen); // file object
    }

    console.log("FormData:", formData);
    console.log("FormData keys:", Array.from(formData.keys())); // Log the keys in FormData
    console.log("FormData values:", Array.from(formData.values())); // Log the values in FormData
    try {
      if (dokumen_upload && form.upload_dokumen) {
        formData.append("upload_dokumen", form.upload_dokumen);
        const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/dokumen-persidangan`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Gagal membuat dokumen sidang:", errorText);
          alert("Gagal mengirim dokumen sidang");
          return;
        }

        const data = await res.json();
        console.log("Response data:", data);
      } else {
        const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/dokumen-persidangan`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Gagal membuat dokumen sidang:", errorText);
          alert("Gagal mengirim dokumen sidang");
          return;
        }

        const data = await res.json();
        console.log("Response data:", data);
      }

      alert("Data berhasil dikirim");
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
      alert("Terjadi kesalahan");
    }
  };
  return (
    <div className="max-h-[600px] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputWithLabelReq
          label="Judul Dokumen"
          placeholder="Ketik judul dokumen"
          name="judul_dokumen"
          type="text"
          value={form.judul_dokumen}
          onChange={(e) => handleChange("judul_dokumen", e.target.value)}
        />
        <InputWithLabelReq
          label="Jenis Dokumen"
          placeholder="Ketik jenis dokumen"
          name="jenis"
          type="text"
          value={form.jenis}
          onChange={(e) => handleChange("jenis", e.target.value)}
        />
        <InputWithLabelReq
          label="Catatan"
          placeholder="Ketik catatan dokumen"
          name="catatan"
          type="text"
          value={form.catatan}
          onChange={(e) => handleChange("catatan", e.target.value)}
        />
        <FileInputFormReq label="Dokumen persidangan" onChange={(file) => handleFileChange("upload_dokumen", file)} name="upload_dokumen" />

        <Button type="submit">Simpan</Button>
      </form>
    </div>
  );
}
