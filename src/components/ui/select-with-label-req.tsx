import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InputProps {
  label: string;
  placeholder: string;
  options?: { value: string; label: string }[];
  name?: string;
  onChange?: (value: any) => void;
}

export default function SelectWithLabelReq({ label, placeholder, options, name, onChange }: InputProps) {
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
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          
        </SelectContent>
      </Select>
    </div>
  );
}
