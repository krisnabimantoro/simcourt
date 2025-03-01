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

import { FormEvent } from "react";
import { useCookies } from "next-client-cookies";
import { useParams } from "next/navigation";
import { statusAlamat, statusPihak } from "@/data/data";
import DataProvinsi from "@/hooks/data-provinsi";
import url_fetch, { apiKeyDaerah } from "@/constant/data-fetching";

interface AdvokatFormProps {
  token: string;
  userId: number;
  classId: number;
}

export default function ClientAdvokat({ token, userId, classId }: AdvokatFormProps) {
  const projectId = useParams().id ?? "";

  // const provinsi = DataProvinsi();

  // console.log(provinsi);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const ktaFile = formData.get("kta") as File;
    // console.log(ktaFile);

    formData.append("kelas_id", classId.toString());
    formData.append("mahasiswa_id", userId.toString());
    formData.append("pendaftaran_sidang_id", projectId.toString());

    const formDataJson = Object.fromEntries(formData.entries());
    console.log("FormData as JSON:", formDataJson);

    try {
      const responsePendaftaran = await fetch("http://127.0.0.1:8020/api/v1/advokats", {
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
      const responsePihak = await fetch("http://127.0.0.1:8020/api/v1/pihaks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Only Authorization header needed for FormData
        },
        credentials: "include",
        body: formData, // Correctly send FormData without JSON.stringify
      });

      if (!responsePihak.ok) {
        const errorData = await responsePihak.json();
        throw new Error(errorData?.message || "Failed to submit");
      }

      const dataPihak = await responsePihak.json();
      // toast({ title: "Pihak berhasil dibuat" });
      console.log("Response:", dataPihak);

      // Redirect after success
      //   router.push(`/advokat/${data.data.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
      console.error("Error:", error);
    }

    try {
      const responseDaftar = await fetch("http://127.0.0.1:8020/api/v1/detail-pendaftarans", {
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

      // Redirect after success
      //   router.push(`/advokat/${data.data.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
      console.error("Error:", error);
    }
  }

  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-4 mb-10">
      <Typography.H2 className="flex flex-col">
        Mengisi Data Advokat{" "}
        <p className="text-sm font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, hic sapiente. Ea fugiat ipsam aliquam harum doloremque{" "}
        </p>
      </Typography.H2>
      <Separator />

      <br />
      <Typography.H3>Form data</Typography.H3>

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
            <InputWithLabelReq label="Nomor Rekening" placeholder="Input Nomor Rekening" name="no_rekening" type="text" />
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

        <Separator className="my-4" />

        <Typography.H3>Tambah Pihak</Typography.H3>

        <InputWithLabelReq
          label={"No Pendaftaran"}
          placeholder={"Input nomor pendaftaran/registrasi"}
          name={"no_pendaftaran"}
          type={"text"}
        />
        <div className="flex mt-2 gap-x-2">
          <div className="w-1/2 gap-y-2 flex flex-col">
            <SelectWithLabel label={"Status Pihak"} placeholder={"Pilih Status Pihak"} options={statusPihak} name={"status_pihak"} />

            <InputWithLabelReq label={"Nama Lengkap"} placeholder={"Input nama lengkap pengacara"} name={"nama_lengkap"} type={"text"} />
            <SelectWithLabel label={"Status  Alamat"} placeholder={"Pilih Status Alamat"} options={statusAlamat} name={"status_alamat"} />
            <SelectWithLabel label={"Provinsi"} placeholder={"Pilih Provinsi"} options={statusAlamat} name={"provinsi"} />
            <SelectWithLabel label={"Kabupaten"} placeholder={"Pilih Kabupaten"} options={statusAlamat} name={"kabupaten"} />
          </div>

          <div className="w-1/2 gap-y-2 flex flex-col ">
            <InputWithLabel label={"Email"} placeholder={"Input Email"} name={"email"} type={"email"} />

            <InputWithLabel label={"Alamat"} placeholder={"Input Alamat Lengkap "} name={"alamat"} type={"text"} />
            <InputWithLabel label={"Telepon"} placeholder={"Input No Telepon "} name={"telepon"} type={"text"} />

            <SelectWithLabel label={"Kecamatan"} placeholder={"Pilih Kecamatan"} options={statusAlamat} name={"kecamatan"} />
            <SelectWithLabel label={"Kelurahan"} placeholder={"Pilih Kelurahan"} options={statusAlamat} name={"kelurahan"} />
          </div>
        </div>
        <Button className="w-full mt-4">Submit</Button>
      </form>

      <br />
    </div>
  );
}
