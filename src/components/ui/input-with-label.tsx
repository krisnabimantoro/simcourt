import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}

export default function InputWithLabel({ label, placeholder, name, type, onChange, value }: InputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-02">{label}</Label>
      <Input id="input-02" placeholder={placeholder} type={type} name={name} onChange={onChange} value={value} />
    </div>
  );
}
