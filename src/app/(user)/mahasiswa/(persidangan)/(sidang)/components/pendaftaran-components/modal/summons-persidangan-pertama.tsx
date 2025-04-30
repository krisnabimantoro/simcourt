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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ModalPersidanganPertama({
  id_pendaftaratan,
  data,
  token,
  user,
  onUpdateSuccess
}: {
  id_pendaftaratan: any;
  data: any;
  token: any;
  user: any;
  onUpdateSuccess: () => void | undefined;
}) {
  const pihak = data?.pendaftaran_sidang?.pihak;
  console.log("ID Pendaftaraasdn:", pihak);
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState({
    kategori: "",
    tanggal_panggilan: "",
    tanggal_sidang: "",
    jam_sidang: "",
    nomor: "",
    catatan_panggilan: "",
    pihak_id: "",
    nama_dokumen: "",
    diupload_oleh: user?.name,
    peran: user?.role,
    status: user?.status,
    keterangan: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      kategori: form.kategori,
      tanggal_panggilan: form.tanggal_panggilan,
      tanggal_sidang: form.tanggal_sidang,
      jam_sidang: form.jam_sidang,
      nomor: form.nomor,
      catatan_panggilan: form.catatan_panggilan,
      detail_pendaftaran_id: parseInt(id_pendaftaratan),
      pihak_id: parseInt(form.pihak_id),
      nama_dokumen: form.nama_dokumen || "",
      diupload_oleh: user?.name || "",
      peran: user?.role || "",
      status: "",
      keterangan: form.keterangan || "",
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
        toast({ title: "Panggilan berhasil dibuat", description: "Cek table untuk melihat data panggilan", variant: "default" });
        onUpdateSuccess();
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
        <Label>Kategori</Label>
        <RadioGroup value={form.kategori} onValueChange={(v) => handleChange("kategori", v)}>
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

        <ComponentTimeField label={"Jam Sidang"} name={"jam_sidang"} onChange={(e) => handleChange("jam_sidang", e.target.value)} />

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
        <InputWithLabel
          label="Nama Dokumen"
          placeholder="Ketik nama dokumen"
          name="nama_dokumen"
          type="text"
          value={form.nama_dokumen}
          onChange={(e) => handleChange("nama_dokumen", e.target.value)}
        />
        <InputWithLabel
          label="Keterangan Dokumen"
          placeholder="Ketik keterangan dokumen"
          name="keterangan"
          type="text"
          value={form.keterangan}
          onChange={(e) => handleChange("keterangan", e.target.value)}
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

        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </form>
    </div>
  );
}
