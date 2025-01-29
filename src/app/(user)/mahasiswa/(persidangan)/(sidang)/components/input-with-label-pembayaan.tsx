import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export default function InputWithLabelReqPembayaran({ label, placeholder, name, type, value, onChange, disabled }: InputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-02">
        {label}
        <span className="text-destructive">*</span>
      </Label>
      <Input
        id="input-02"
        placeholder={placeholder}
        type={type}
        required
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
