import Typography from "@/components/ui/typhography";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function CardFooterSidebar() {
  return (
    <div className="flex items-center rounded-lg transition-all hover:bg-gray-100 p-2 hover:cursor-pointer">
      <Image src="/krisna.png" width={40} height={40} alt="Logo Laboratorium Hukum" className="rounded-lg" />
      <div className="ml-2 flex flex-col items-start">
        <Typography.H5>Krisna Bimantoro</Typography.H5>
        <p className="text-sm">Kuasa Hakim</p>
      </div>
      <ChevronRight className="ml-auto" />
    </div>
  );
}

export function CardHeaderSidebar() {
  return (
    <div className="flex items-center justify-center w-full h-full p-2">
      <Image src="/logo.png" width={50} height={74.6} alt="Logo Laboratorium Hukum" className=" p-2 rounded-lg dark:bg-white" />
      <div className="ml-3 items-center justify-center">
        <Typography.H3>Sim-Court</Typography.H3>
        <Typography.P>Sistem lorem ipsum</Typography.P>
      </div>
    </div>
  );
}
