import { Label } from "@/components/ui/label";
import Form from "next/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InputWithLabel from "@/components/ui/input-with-label";
import { InputDateWIthLabel } from "@/components/ui/input-date-req";
import { ComponentTimeField } from "@/components/time-field-input";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import InputWithLabelReq from "@/components/ui/input-with-label-req";
import { useToast } from "@/hooks/use-toast";

export default function ModalCourtCalendar({
  id_persidangan,
  token,
  user,
  onUpdateSuccess,
}: {
  id_persidangan: any;
  token: any;
  user: any;
  onUpdateSuccess: () => void | undefined;
}) {
  console.log("ID persidangan:", id_persidangan);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const { toast } = useToast();
  const [form, setForm] = useState({
    hari_tanggal: "",
    jam: "",
    agenda: "",
    keterangan: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      detail_pendaftaran_id: parseInt(id_persidangan),
      hari_tanggal: form.hari_tanggal,
      jam: form.jam || "12:00",
      agenda: form.agenda,
      keterangan: form.keterangan,
    };

    console.log("Payload:", JSON.stringify(payload));
    try {
      const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/jadwal-sidang`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Gagal membuat jadwal sidang:", errorText);
        alert("Gagal mengirim jadwal sidang");
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);

      if (!data?.data?.id) {
        console.error("ID dari jadwal sidang tidak ditemukan:", data);
        alert("Gagal mendapatkan ID jadwal sidang");
        return;
      }

      const resPersidangan = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/persidangan`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ jadwal_sidang_id: data.data.id }),
      });

      if (!resPersidangan.ok) {
        const persidanganError = await resPersidangan.text();
        console.error("Gagal mengirim data persidangan:", persidanganError);
        alert("Gagal mengirim data persidangan");
        return;
      }

      onUpdateSuccess();
      toast({ title: "Persidangan berhasil dibuat", description: "Cek table untuk melihat data persidangan", variant: "default" });
    } catch (err) {
      toast({ title: "Terjadi kesalahan", description: String(err), variant: "destructive" });
    }
  };
  return (
    <div className="max-h-[600px] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputDateWIthLabel label="Tanggal Sidang" name="hari_tanggal" onChange={(e) => handleChange("hari_tanggal", e.target.value)} />

        <ComponentTimeField label={"Jam Sidang"} name={"jam"} onChange={(e) => handleChange("jam", e.target.value)} />

        <InputWithLabelReq
          label="Agenda Sidang"
          placeholder="Ketik agenda sidang"
          name="agenda"
          type="text"
          value={form.agenda}
          onChange={(e) => handleChange("agenda", e.target.value)}
        />

        <div className="grid w-full gap-1.5">
          <Label htmlFor="keterangan_sidang">
            Keterangan Sidang
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            required
            id="keterangan_sidang"
            placeholder="Ketik keterangan sidang"
            value={form.keterangan}
            onChange={(e) => handleChange("keterangan", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Keterangan ini akan ditampilkan pada halaman detail sidang. Pastikan untuk memberikan informasi yang jelas dan lengkap.
          </p>
        </div>

        <Button type="submit">Simpan</Button>
      </form>
    </div>
  );
}
