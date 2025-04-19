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

export default function ModalPersidanganPertama({
  id_pendaftaratan,
  data,
  token,
 
}: {
  id_pendaftaratan: any;
  data: any;
  token: any;
 
}) {
 
  const pihak = data?.data?.pendaftaran_sidang?.pihak;
  console.log("ID Pendaftaraasdn:", pihak);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const [form, setForm] = useState({
    kategori: "panggilan",
    tanggal_panggilan: "",
    tanggal_sidang: "",
    jam_sidang: "12:00",
    nomor: "",
    catatan_panggilan: "",
    pihak_id: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nomor: form.nomor,
      tanggal_sidang: form.tanggal_sidang,
      jam_sidang: form.jam_sidang,
      detail_pendaftaran_id: parseInt(id_pendaftaratan),
      catatan_panggilan: form.catatan_panggilan,
      kategori: form.kategori,
      tanggal_panggilan: form.tanggal_panggilan,
      pihak_id: parseInt(form.pihak_id),
    };

    console.log("Payload:", JSON.stringify(payload));
    try {
      const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/panggilan-sidang`, {
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
    <div>
      <form onSubmit={handleSubmit} className="space-y-4" >
        <Label>Kategori</Label>
        <RadioGroup defaultValue="panggilan" onValueChange={(v) => handleChange("kategori", v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="panggilan" id="panggilan" />
            <Label htmlFor="panggilan">Panggilan</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pemberitahuan" id="pemberitahuan" />
            <Label htmlFor="pemberitahuan">Pemberitahuan</Label>
          </div>
        </RadioGroup>

        <Separator className="mb-4" />

        <div className="space-y-4">
          <InputDateWIthLabel
            label="Tanggal Panggilan"
            name="tanggal_panggilan"
            onChange={(e) => handleChange("tanggal_panggilan", e.target.value)}
          />
          <InputDateWIthLabel
            label="Tanggal Sidang"
            name="tanggal_sidang"
            onChange={(e) => handleChange("tanggal_sidang", e.target.value)}
          />
        </div>

        <ComponentTimeField />

        <div>
          <Label className="mb-2">Pilih Pihak</Label>
          <Select onValueChange={(val) => handleChange("pihak_id", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih pihak" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pihak</SelectLabel>
                {pihak.map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.nama_lengkap}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <InputWithLabel
          label="Nomor Perkara"
          placeholder="Ketik nomor perkara"
          name="nomor"
          type="text"
          value={form.nomor}
          onChange={(e) => handleChange("nomor", e.target.value)}
        />

        <div className="grid w-full gap-1.5">
          <Label htmlFor="catatan_panggilan">Catatan Panggilan</Label>
          <Textarea
            id="catatan_panggilan"
            placeholder="Ketik catatan panggilan"
            value={form.catatan_panggilan}
            onChange={(e) => handleChange("catatan_panggilan", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Catatan panggilan digunakan untuk mengkomunikasikan hal-hal terkait persidangan yang harus disampaikan dalam panggilan
          </p>
        </div>

        <Button type="submit">Simpan</Button>
      </form>
    </div>
  );
}
