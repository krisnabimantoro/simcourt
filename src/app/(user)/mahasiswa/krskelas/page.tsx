import Typography from "@/components/ui/typhography";
import InputSearchComponents from "./components/input-search";
import ComponentSelectClass from "./components/select-kelas";
import CardClass from "./components/card-class";


export default async function KrsKelas() {
 
  return (
    <div className="w-[calc(100vw-18rem)]  ml-2 ">
      <Typography.H2 className="flex flex-col">
        Halaman KRS Kelas <p className="text-sm font-normal">Pilih kelas</p>
      </Typography.H2>
      <div className="flex gap-2 mt-4 h-full">
        <div className="flex w-full">
          <InputSearchComponents />
        </div>
      </div>
      <Typography.H3 className="mt-4">List Kelas</Typography.H3>
      <div className="w-full gap-5 flex pt-2">
        <div className="w-1/2">
          <ComponentSelectClass />
        </div>
        <div className="w-1/2 space-y-4">
          <CardClass />
        </div>
      </div>
    </div>
  );
}
