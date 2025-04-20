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

export default function ModalCourtCalendar({ id_persidangan, token, user }: { id_persidangan: any; token: any; user: any }) {
  console.log("ID persidangan:", id_persidangan);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;

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
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Data berhasil dikirim");
      } else {
        console.error(await res.text());
        alert("Gagal mengirim");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };
  return (
    <div className="max-h-[600px] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputDateWIthLabel label="Tanggal Sidang" name="hari_tanggal" onChange={(e) => handleChange("hari_tanggal", e.target.value)} />

        <ComponentTimeField />

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
