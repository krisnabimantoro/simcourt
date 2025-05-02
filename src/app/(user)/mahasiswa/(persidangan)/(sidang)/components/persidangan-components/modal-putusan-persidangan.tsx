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

export default function ModalPutusanPersidangan({ id_persidangan, token, user }: { id_persidangan: any; token: any; user: any }) {
  console.log("ID persidangan:", id_persidangan);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;

  console.log("User data:", user);
  const [form, setForm] = useState({
    detail_pendaftaran_id: id_persidangan,
    tanggal_putusan: "",
    amar_putusan: "",
    tanggal_minutasi: "",
    tanggal_bht: "",
    file: null as File | null,
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  //   };
  const handleFileChange = (name: string, file: File | null) => {
    setForm((prev) => ({ ...prev, [name]: file }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append the persidangan ID
    formData.append("detail_pendaftaran_id", form.detail_pendaftaran_id.toString());

    formData.append("tanggal_putusan", form.tanggal_putusan || "");
    formData.append("amar_putusan", form.amar_putusan || "");
    formData.append("tanggal_minutas", form.tanggal_minutasi || "");
    formData.append("tanggal_bht", form.tanggal_bht || "");

    if (form.file) {
      formData.append("file", form.file); // File object
    }

    // console.log("Payload:", JSON.stringify(payload));
    console.log("FormData:", formData);
    console.log("FormData keys:", Array.from(formData.keys())); // Log the keys in FormData
    console.log("FormData values:", Array.from(formData.values())); // Log the values in FormData
    try {
      const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/keputusan-akhir`, {
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

      alert("Data berhasil dikirim");
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
      alert("Terjadi kesalahan");
    }
  };
  return (
    <div className="max-h-[400px] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputDateWIthLabel
          label="Tanggal Putusan"
          name="tanggal_putusan"
          onChange={(e) => handleChange("tanggal_putusan", e.target.value)}
        />

        <div className="grid w-full gap-1.5">
          <Label htmlFor="keterangan_sidang">
            Amar Putusan
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            required
            id="amar_putusan"
            placeholder="Ketik amar putusan"
            value={form.amar_putusan}
            onChange={(e) => handleChange("amar_putusan", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Amar putusan adalah ringkasan dari keputusan yang diambil oleh hakim dalam suatu perkara. Ini mencakup hasil akhir dari
            persidangan dan keputusan yang diambil oleh hakim.
          </p>
        </div>

        <InputDateWIthLabel
          label="Tanggal Minutasi"
          name="tanggal_minutasi"
          onChange={(e) => handleChange("tanggal_minutasi", e.target.value)}
        />

        <InputDateWIthLabel label="Tanggal BHT" name="tanggal_bht" onChange={(e) => handleChange("tanggal_bht", e.target.value)} />

        <FileInputFormReq label="Dokumen Putusan Akhir" onChange={(file) => handleFileChange("file", file)} name="file" />

        <Button type="submit">Simpan</Button>
      </form>
    </div>
  );
}
