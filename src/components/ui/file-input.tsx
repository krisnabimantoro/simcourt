import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  label: string;
}
export default function FileInputForm({ label }: InputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-30">
        {label} <span className="text-destructive">*</span>
      </Label>
      <Input
        id="input-30"
        className="block w-full mb-5 text-xs text-gray-900   rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none  dark:placeholder-gray-400"
        type="file"
      />
    </div>
  );
}
