import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
}

export default function InputWithLabelReq({ label, placeholder, name, type }: InputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-02">
        {label}
        <span className="text-destructive">*</span>
      </Label>
      <Input id="input-02" placeholder={placeholder} type={type} required name={name} />
    </div>
  );
}
