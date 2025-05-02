"use client";

import { Button } from "@/components/ui/button";
import FileInputForm from "@/components/ui/file-input";
import { InputDateWIthLabel } from "@/components/ui/input-date-req";
import InputWithLabel from "@/components/ui/input-with-label";
import InputWithLabelReq from "@/components/ui/input-with-label-req";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import Form from "next/form";

import SelectWithLabel from "@/components/ui/select-with-label-req";
import FileInputFormReq from "../../components/file-input";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { useParams } from "next/navigation";
import { statusAlamat, statusPihak } from "@/data/data";
import DataProvinsi from "@/hooks/data-provinsi";
import NEXT_PUBLIC_URL_FETCH, { apiKeyDaerah } from "@/constant/data-fetching";
import SelectWithLabelReqWilayah from "@/components/ui/select-with-label-req-wilayah";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { Trash2 } from "lucide-react";

interface AdvokatFormProps {
  token: string;
  userId: number;
  classId: number;
}

export default function ClientAdvokat({ token, userId, classId }: AdvokatFormProps) {
  const projectId = useParams().id ?? "";
  const router = useRouter();
  // const provinsi = DataProvinsi();
  const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
  const url = process.env.URL_AUTH;

  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");

  const [valueProvinsi, setValueProvinsi] = useState("");
  const [valueKabupaten, setValueKabupaten] = useState("");
  const [valueKecamatan, setValueKecamatan] = useState("");
  const [valueKelurahan, setValueKelurahan] = useState("");

  const [dataPihak, setDataPihak] = useState<any>([]);

  const [nomorPendaftaran, setNomorPendaftaran] = useState("");

  const [idPihak, setIdPihak] = useState(0);
  useEffect(() => {
    fetch("/api/wilayah")
      .then((res) => res.json())
      .then((data) => setProvinsi(data));
  }, []);

  // Fetch Kabupaten on Provinsi change
  useEffect(() => {
    if (selectedProvinsi) {
      fetch(`/api/kabupaten?provinsi=${selectedProvinsi}`)
        .then((res) => res.json())
        .then((data) => setKabupaten(data));
    }
  }, [selectedProvinsi]);

  // Fetch Kecamatan on Kabupaten change
  useEffect(() => {
    if (selectedKabupaten) {
      fetch(`/api/kecamatan?kabupaten=${selectedKabupaten}`)
        .then((res) => res.json())
        .then((data) => setKecamatan(data));
    }
  }, [selectedKabupaten]);

  // Fetch Kelurahan on Kecamatan change
  useEffect(() => {
    if (selectedKecamatan) {
      fetch(`/api/kelurahan?kecamatan=${selectedKecamatan}`)
        .then((res) => res.json())
        .then((data) => setKelurahan(data));
    }
  }, [selectedKecamatan]);

  // console.log(provinsi);

  const pathname = usePathname();
  const pathSegments = pathname.split("/"); // ['', 'mahasiswa', 'perdata', 'gugatan', 'advokat', '329']
  const jenisPendaftaran = pathSegments[3];

  const fetchDataPihak = async (): Promise<any> => {
    const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/pihaks/sidang:${projectId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  };

  const loadData = async () => {
    try {
      const result = await fetchDataPihak();
      setDataPihak(result?.data);
    } catch (error) {
      console.error("Gagal ambil data pembayaran:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  console.log("Data panggilan:", dataPihak);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/pihaks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Gagal menghapus data");
      toast({ title: "Berhasil menghapus data", variant: "default" });
      loadData();
    } catch (error) {
      console.error("Gagal menghapus:", error);
    }
  };

  async function onSubmitPihak(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formDataPihak = new FormData(form);
    formDataPihak.append("pendaftaran_sidang_id", projectId.toString());
    formDataPihak.append("provinsi", valueProvinsi);
    formDataPihak.append("kabupaten", valueKabupaten);
    formDataPihak.append("kecamatan", valueKecamatan);
    formDataPihak.append("kelurahan", valueKelurahan);

    try {
      const responsePihak = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/pihaks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Only Authorization header needed for FormData
        },
        credentials: "include",
        body: formDataPihak, // Correctly send FormData without JSON.stringify
      });

      console.log("Response Pihak:", responsePihak);

      if (!responsePihak.ok) {
        const errorData = await responsePihak.json();
        throw new Error(errorData?.message || "Failed to submit");
      }

      const dataPihak = await responsePihak.json();
      // toast({ title: "Pihak berhasil dibuat" });
      console.log("Response:", dataPihak);

      toast({ title: "Pihak berhasil dibuat", variant: "default" });
      loadData();
      form.reset();

      // Redirect after success
      //   router.push(`/advokat/${data.data.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
      console.error("Error:", error);
    }
  }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const ktaFile = formData.get("kta") as File;
    // console.log(ktaFile);
    try {
      formData.append("kelas_id", classId.toString());
      formData.append("mahasiswa_id", userId.toString());
      formData.append("pendaftaran_sidang_id", projectId.toString());
      formData.append("persetujuan", "belum_membuat");
      formData.append("no_pendaftaran", nomorPendaftaran);
      formData.append("jenis_perkara", jenisPendaftaran);
      formData.append("status_pendaftaran", "belum_terdaftar");
    } catch (error: any) {
      console.error("Error appending data to FormData:", error.message);
      if (!classId) {
        toast({ title: "Kelas ID tidak ditemukan", variant: "destructive" });
        router.push("/mahasiswa/krskelas");
      }
      return;
    }

    const formDataJson = Object.fromEntries(formData.entries());
    console.log("FormData as JSON:", formDataJson);

    try {
      const responsePendaftaran = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/advokats`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Only Authorization header needed for FormData
        },
        credentials: "include",
        body: formData, // Correctly send FormData without JSON.stringify
      });

      if (!responsePendaftaran.ok) {
        const errorData = await responsePendaftaran.json();
        throw new Error(errorData?.message || "Failed to submit");
      }

      const dataPendaftaran = await responsePendaftaran.json();

      console.log("Response:", dataPendaftaran);

      // Redirect after success
      //   router.push(`/advokat/${data.data.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // toast({ title: error.message, variant: "destructive" });
      console.error("Error:", error);
    }

    try {
      const responseDaftar = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/detail-pendaftarans`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Only Authorization header needed for FormData
        },
        credentials: "include",
        body: formData, // Correctly send FormData without JSON.stringify
      });

      if (!responseDaftar.ok) {
        const errorData = await responseDaftar.json();
        throw new Error(errorData?.message || "Failed to submit");
      }

      const dataDaftar = await responseDaftar.json();
      toast({ title: "Pendaftaran Sidang berhasil dibuat" });
      console.log("Response:", dataDaftar);

      router.push("/mahasiswa/perdata/gugatan");

      // Redirect after success
      //   router.push(`/advokat/${data.data.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
      console.error("Error:", error);
    }
  }
  console.log("Selected Provinsi:", selectedProvinsi);

  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-4 mb-10">
      <Typography.H2 className="flex flex-col">
        Mengisi Data Pendaftaran Persidangan{" "}
        <p className="text-sm font-normal">
          Silakan isi data pendaftaran persidangan dengan lengkap dan benar. Pastikan semua dokumen yang diperlukan sudah diunggah.
        </p>
      </Typography.H2>
      <Separator />

      <br />

      <Typography.H3>Tambah Pihak</Typography.H3>
      <Separator className="my-2" />
      {dataPihak && dataPihak.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {dataPihak.map((pihak) => (
            <Card key={pihak.id} className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>{pihak.nama_lengkap}</CardTitle>
                <CardDescription>Status: {pihak.status_pihak}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>
                  <strong>Email:</strong> {pihak.email}
                </p>
                <p>
                  <strong>Telepon:</strong> {pihak.telepon}
                </p>
                <p>
                  <strong>Alamat:</strong> {pihak.alamat}
                </p>
                <p>
                  <strong>Wilayah:</strong> {`${pihak.provinsi} / ${pihak.kabupaten} / ${pihak.kecamatan} / ${pihak.kelurahan}`}
                </p>
                <p>
                  <strong>Persetujuan:</strong> {pihak.persetujuan}
                </p>
              </CardContent>
         
              <CardFooter className="text-xs text-gray-500 flex justify-between items-center">
                Dibuat pada: {new Date(pihak.created_at).toLocaleString()}
                <Trash2 className="hover:cursor-pointer text-red-500" onClick={() => handleDelete(pihak.id)} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <Separator className="my-4" />
      <form onSubmit={onSubmitPihak} className=" ">
        <InputWithLabelReq
          label={"No Pendaftaran"}
          placeholder={"Input nomor pendaftaran/registrasi"}
          name={"no_pendaftaran"}
          type={"text"}
          onChange={(e) => setNomorPendaftaran(e.target.value)}
        />

        <div className="flex mt-2 gap-x-2">
          <div className="w-1/2 gap-y-2 flex flex-col">
            <SelectWithLabel label={"Status Pihak"} placeholder={"Pilih Status Pihak"} options={statusPihak} name={"status_pihak"} />

            <InputWithLabelReq label={"Nama Lengkap"} placeholder={"Input nama lengkap pengacara"} name={"nama_lengkap"} type={"text"} />
            <SelectWithLabel label={"Status  Alamat"} placeholder={"Pilih Status Alamat"} options={statusAlamat} name={"status_alamat"} />
            <SelectWithLabelReqWilayah
              label={"Provinsi"}
              placeholder={"Pilih Provinsi"}
              name="provinsi"
              options={provinsi}
              onChange={(key) => setSelectedProvinsi(key)}
              onLabelChange={(nama) => setValueProvinsi(nama)}
            />
            <SelectWithLabelReqWilayah
              label={"Kabupaten"}
              placeholder={"Pilih Kabupaten"}
              name="kabupaten"
              options={kabupaten}
              onChange={(key) => setSelectedKabupaten(key)}
              onLabelChange={(nama) => setValueKabupaten(nama)}
            />
          </div>

          <div className="w-1/2 gap-y-2 flex flex-col ">
            <InputWithLabel label={"Email"} placeholder={"Input Email"} name={"email"} type={"email"} />

            <InputWithLabel label={"Alamat"} placeholder={"Input Alamat Lengkap "} name={"alamat"} type={"text"} />
            <InputWithLabel label={"Telepon"} placeholder={"Input No Telepon "} name={"telepon"} type={"text"} />

            <SelectWithLabelReqWilayah
              label={"Kecamatan"}
              placeholder={"Pilih Kecamatan"}
              name="kecamatan"
              options={kecamatan}
              onLabelChange={(nama) => setValueKecamatan(nama)}
              onChange={(key) => setSelectedKecamatan(key)}
            />
            <SelectWithLabelReqWilayah
              label={"Kelurahan"}
              placeholder={"Pilih Kelurahan"}
              name="kelurahan"
              options={kelurahan}
              onLabelChange={(nama) => setValueKelurahan(nama)}
            />
          </div>
        </div>
        <FileInputForm label="Dokumen Surat Kuasa" name="dokumen_surat_kuasa" />
        <Button className="w-full mt-4" type="submit" variant={"default"}>
          Tambah Pihak
        </Button>
      </form>

      <Separator className="my-4" />
      <Typography.H3>Form data Advokat</Typography.H3>

      <form onSubmit={onSubmit} className=" ">
        <div className="flex">
          <div className="w-1/2 gap-y-4 flex flex-col">
            <InputWithLabelReq label="Nama Lengkap" placeholder="Input nama lengkap" name="nama_lengkap" type="text" />
            <InputWithLabelReq label="Alamat Kantor" placeholder="Input alamat kantor" name="alamat_kantor" type="text" />
            <InputWithLabel label="No Handphone" placeholder="Input nomor handphone" name="no_handphone" type="number" />
            <InputWithLabel label="Telp./Fax Kantor" placeholder="Input nomor telp/fax kantor" name="telp_kantor" type="number" />
            <InputWithLabelReq label="Nomor Induk (KTA)" placeholder="Input Nomor Induk" name="no_induk" type="number" />
            <InputWithLabelReq label="Organisasi" placeholder="Input asal organisasi" name="organisasi" type="text" />

            <InputWithLabelReq label="BANK" placeholder="Input nama bank" name="bank" type="text" />
            <InputWithLabelReq label="Nomor Rekening" placeholder="Input Nomor Rekening" name="no_rekening" type="number" />
          </div>

          <div className="w-1/2 ml-8 gap-y-4 flex flex-col">
            <InputDateWIthLabel label="Tanggal Mulai Berlaku" name="tanggal_mulai_berlaku" />
            <InputDateWIthLabel label="Tanggal Penyumpahan" name="tanggal_penyumpahan" />
            <InputDateWIthLabel label="Tanggal Habis Berlaku" name="tanggal_habis_berlaku" />
            <InputWithLabelReq label="Tempat Penyumpahan" placeholder="Input tempat penyumpahan" name="tempat_penyumpahan" type="text" />
            <InputWithLabelReq label="Nomor BA Sumpah" placeholder="Input nomor BA sumpah" name="no_ba_sumpah" type="number" />
            <InputWithLabelReq label="Nomor KTP" placeholder="Input Nomor KTP" name="no_ktp" type="number" />

            <InputWithLabelReq label="Nama Akun Bank" placeholder="Input nama akun bank" name="nama_akun_bank" type="text" />
          </div>
        </div>
        <Separator className="my-4" />

        <Typography.H3>Dokumen Pendukung Pengacara</Typography.H3>
        <span className="mt-2"></span>
        <FileInputForm label="Dokumen KTA" name="file_dokumen_kta" />
        <FileInputForm label="Dokumen Penyumpahan" name="file_dokumen_penyumpahan" />
        <FileInputForm label="Dokumen KTP" name="file_dokumen_ktp" />

        <Button className="w-full mt-4">Submit</Button>
      </form>

      <br />
    </div>
  );
}
