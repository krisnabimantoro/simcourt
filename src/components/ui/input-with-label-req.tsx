import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithLabelReq({ label, placeholder, name, type, onChange }: InputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        <span className="text-destructive">*</span>
      </Label>
      <Input id={name} placeholder={placeholder} type={type} required name={name} onChange={onChange} />
    </div>
  );
}
