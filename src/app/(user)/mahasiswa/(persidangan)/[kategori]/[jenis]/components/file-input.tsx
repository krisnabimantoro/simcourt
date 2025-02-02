import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileInputProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
}

export default function FileInputFormReq({ label, name, onChange, accept = "", multiple = false, required = false }: FileInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        className="block w-full text-xs text-gray-900 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:placeholder-gray-400"
        type="file"
        accept={accept}
        multiple={multiple}
        required={required}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          onChange(file);
        }}
      />
    </div>
  );
}
