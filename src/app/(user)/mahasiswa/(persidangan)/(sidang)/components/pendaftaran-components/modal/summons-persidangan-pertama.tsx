import { Label } from "@/components/ui/label";
import Form from "next/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InputWithLabel from "@/components/ui/input-with-label";
import { InputDateWIthLabel } from "@/components/ui/input-date-req";
import ComponentTimeField from "@/components/time-field-input";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Textarea } from "@/components/ui/textarea";
export default function ModalPersidanganPertama() {
  return (
    <div>
      <Form action={""} className="space-y-2">
        <Label>Kategori</Label>
        <RadioGroup defaultValue="panggilan">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="panggilan" id="panggilan" />
            <Label htmlFor="panggilan">Panggilan</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pemberitahuan" id="pemberitahuan" />
            <Label htmlFor="pemberitahuan">pemberitahuan</Label>
          </div>
        </RadioGroup>
        <Separator className="mb-4" />

        <div className="space-y-4">
          <InputDateWIthLabel label={"Tanggal Panggilan"} />
          <InputDateWIthLabel label={"Tanggal Sidang"} />
          <InputDateWIthLabel label={"Tanggal Sidang"} />
        </div>
        <ComponentTimeField />

        <div>
          <Label className="mb-2">Pilih Pihak</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pilih Pihak</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <InputWithLabel label={"Nomor Perkara"} placeholder={"Ketik nomor perkara"} name={"nomor-perkara"} type={"text"} />
        <div className="grid w-full gap-1.5 ">
          <Label htmlFor="message-2">Catatan Panggilan</Label>
          <Textarea placeholder="Ketik catatan panggilan yang akan disampaikan di sini" id="message-2" />
          <p className="text-sm text-muted-foreground">
            Catatan panggilan digunakan untuk mengkomunikasikan hal-hal terkait persidangan yang harus disampaikan dalam panggilan
          </p>
        </div>
      </Form>
    </div>
  );
}
