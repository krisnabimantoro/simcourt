import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InputProps {
  label: string;
  placeholder: string;
  options?: { kode: string; nama: string }[]; // options is optional
  name?: string;
  onChange?: (value: any) => void;
}

export default function SelectWithLabelReqWilayah({ label, placeholder, options = [], name, onChange }: InputProps) {
  // Ensure options is an array before calling map
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        <span className="text-destructive">*</span>
      </Label>
      <Select name={name} onValueChange={onChange}>
        <SelectTrigger id={name}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {safeOptions.map((option) => (
            <SelectItem key={option.kode} value={option.kode}>
              {option.nama}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
