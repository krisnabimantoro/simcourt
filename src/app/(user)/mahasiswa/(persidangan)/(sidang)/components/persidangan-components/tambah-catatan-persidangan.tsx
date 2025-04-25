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

export default function TambahCatatanPersidangan({ id_persidangan, token, user }: { id_persidangan: any; token: any; user: any }) {
  console.log("ID persidangan:", id_persidangan);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;

  console.log("User data:", user);
  const [form, setForm] = useState({
    persidangan_id: id_persidangan,
    keterangan: "",
    ditulis_oleh: user?.role,
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
    formData.append("persidangan_id", form.persidangan_id.toString());

    formData.append("keterangan", form.keterangan || "");
    formData.append("ditulis_oleh", form.ditulis_oleh || "");

    // console.log("Payload:", JSON.stringify(payload));
    console.log("FormData:", formData);
    console.log("FormData keys:", Array.from(formData.keys())); // Log the keys in FormData
    console.log("FormData values:", Array.from(formData.values())); // Log the values in FormData
    try {
      const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/persidangan/${id_persidangan}/catatan`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Gagal membuat catatan sidang:", errorText);
        alert("Gagal mengirim catatan sidang");
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
    <div className="max-h-[600px] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="keterangan_sidang">
            Keterangan
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            required
            id="keterangan"
            placeholder="Ketik Catatan Persidangan"
            value={form.keterangan}
            onChange={(e) => handleChange("keterangan", e.target.value)}
          />
          <p className="text-sm text-muted-foreground text-justify">
            Catatan Persidangan ini akan menjadi bagian dari dokumen persidangan dan dapat diakses oleh pihak-pihak terkait. Pastikan
            informasi yang dimasukkan akurat dan sesuai dengan fakta persidangan.
          </p>
        </div>

        <Button type="submit">Tambah</Button>
      </form>
    </div>
  );
}
