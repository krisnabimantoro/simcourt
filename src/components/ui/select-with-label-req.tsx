import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InputProps {
  label: string;
  placeholder: string;
}
export default function SelectWithLabelReq({ label, placeholder }: InputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-16">
        {label}
        <span className="text-destructive">*</span>
      </Label>
      <Select>
        <SelectTrigger id="select-16">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="s1">1</SelectItem>
          <SelectItem value="s2">2</SelectItem>
          <SelectItem value="s3">3</SelectItem>
          <SelectItem value="s4">4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
