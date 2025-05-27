import Typography from "@/components/ui/typhography";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function CardFooterSidebar({ dataUser }: { dataUser: any }) {
  console.log("Data User:", dataUser);
  return (
    <div className="flex items-center rounded-lg transition-all hover:bg-gray-100 p-2 hover:cursor-pointer">
      <Image src="/icon_profile.png" width={40} height={40} alt="Logo Laboratorium Hukum" className="rounded-lg" />
      <div className="ml-2 flex flex-col items-start">
        <Typography.H5>{dataUser?.name}</Typography.H5>
        <p className="text-sm">{dataUser?.role.replace(/_/g, " ")}</p>
      </div>
      <ChevronRight className="ml-auto" />
    </div>
  );
}

export function CardHeaderSidebar() {
  return (
    <div className="flex items-center justify-center w-full h-full p-2">
      <Image src="/logo_sidebar.png" width={200} height={20} alt="Logo Laboratorium Hukum" className=" p-2 rounded-lg dark:bg-white" />
      {/* <div className="ml-3 items-center justify-center">
        <Typography.H3>SimuCourt</Typography.H3>
        <Typography.P>Hukum UMM</Typography.P>
      </div> */}
    </div>
  );
}
