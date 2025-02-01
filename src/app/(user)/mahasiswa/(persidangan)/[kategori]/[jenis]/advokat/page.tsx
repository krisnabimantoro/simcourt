import { Button } from "@/components/ui/button";
import FileInputForm from "@/components/ui/file-input";
import { InputDateWIthLabel } from "@/components/ui/input-date-req";
import InputWithLabel from "@/components/ui/input-with-label";
import InputWithLabelReq from "@/components/ui/input-with-label-req";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";
import Form from "next/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SelectWithLabel from "@/components/ui/select-with-label-req";

export default function Advokat() {
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

      <Form action={"/advokat"} className="flex mt-2">
        <div className="w-1/2 gap-y-4 flex flex-col">
          <InputWithLabelReq label={"Nama Lengkap"} placeholder={"Input nama lengkap pengacara"} name={"name"} type={"text"} />
          <InputWithLabel label={"Telp./Fax Kantor"} placeholder={"Input nomor telp/fax kantor"} name={"telp"} type={"number"} />
          <InputWithLabelReq label={"Nomor Induk (KTA)"} placeholder={"Input Nomor Induk (KTA)"} name={"kta"} type={"text"} />
          <InputDateWIthLabel label={"Tanggal Mulai Berlaku"} />
          <InputDateWIthLabel label={"Tanggal Penyumpahan"} />
          <InputWithLabelReq label={"Nomor BA Sumpah"} placeholder={"Input nomor BA sumpah"} name={"noba"} type={"text"} />
          <InputWithLabelReq label={"BANK"} placeholder={"Input nama bank"} name={"bank"} type={"text"} />
          <InputWithLabelReq label={"Nama Akun Bank"} placeholder={"Input nama akun bank"} name={"akunbank"} type={"text"} />
        </div>
        <div className="w-1/2 ml-8 gap-y-4 flex flex-col">
          <InputWithLabelReq label={"Alamat Kantor"} placeholder={"Input alamat kantor"} name={"address"} type={"text"} />
          <InputWithLabel label={"No Handphone"} placeholder={"Input nomor handphone"} name={"handphone"} type={"number"} />
          <InputWithLabelReq label={"Organisasi"} placeholder={"Input asal organisasi"} name="organisasi" type={"text"} />
          <InputDateWIthLabel label={"Tanggal Habis Berlaku"} />
          <InputWithLabelReq label={"Tempat Penyumpahan"} placeholder={"Input tempat penyumpahan"} name="tempatpenyumpahan" type={"text"} />
          <InputWithLabelReq label={"Nomor KTP"} placeholder={"Input Nomor KTP"} name={"noktp"} type={"number"} />
          <InputWithLabelReq label={"Nomor Rekening"} placeholder={"Input Nomor Rekening"} name={"norek"} type={"number"} />
        </div>
      </Form>

      <Separator className="my-4" />

      <Typography.H3>Dokumen Pendukung Pengacara</Typography.H3>
      <span className="mt-2"></span>
      <FileInputForm label={"Dokumen KTA"} />
      <FileInputForm label={"Dokumen Penyumpahan"} />
      <FileInputForm label={"Dokumen KTP"} />

      <Separator className="my-4" />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-10">Lanjut Pendaftaran</Button>
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Tambah Pihak</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat ipsa eius incidunt. Rem repellendus maiores iusto quidem
            </DialogDescription>
            <Form action={""} className="">
              <div className="flex  gap-x-2">
                <div className="w-1/2 gap-y-4 flex flex-col">
                  <SelectWithLabel label={"Status Pihak"} placeholder={"Pilih Status Pihak"} />

                  <InputWithLabelReq label={"Nama Lengkap"} placeholder={"Input nama lengkap pengacara"} name={"name"} type={"text"} />
                  <SelectWithLabel label={"Status Alamat"} placeholder={"Pilih Status Alamat"} />
                  <SelectWithLabel label={"Provinsi"} placeholder={"Pilih Provinsi"} />
                  <SelectWithLabel label={"Kabupaten"} placeholder={"Pilih Kabupaten"} />
                </div>

                <div className="w-1/2 gap-y-4 flex flex-col ">
                  <InputWithLabel label={"Email"} placeholder={"Input Email"} name={"email"} type={"email"} />

                  <InputWithLabel label={"Alamat"} placeholder={"Input Alamat Lengkap "} name={"alamat"} type={"text"} />
                  <InputWithLabel label={"Telepon"} placeholder={"Input No Telepon "} name={"notelp"} type={"text"} />

                  <SelectWithLabel label={"Status Kecamatan"} placeholder={"Pilih Kecamatan"} />
                  <SelectWithLabel label={"Status Kelurahan"} placeholder={"Pilih Kelurahan"} />
                </div>
              </div>
              <Button className="w-full mt-4">Submit</Button>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <br />
    </div>
  );
}
