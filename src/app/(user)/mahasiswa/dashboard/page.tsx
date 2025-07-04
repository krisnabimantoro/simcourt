import Typography from "@/components/ui/typhography";
import BlurFade from "@/components/ui/blur-fade";
import CardAnggota from "./components/card-anggota-kelompok";
import CardKelompok from "./components/card-detail-kelompok";
import CardInformasi from "./components/card-informasi";
import CardTatacara from "./components/card-tatacara.";
import CardPersidangan from "./components/card-persidangan";
import GetFetchingData from "@/lib/fetching-component-get";
// import { GetIdUser } from "@/lib/get-id-user";

export default async function DashboardMahasiswa() {
  const responseMe = await GetFetchingData("v1/auth/me");
  const classId = responseMe?.data?.kelas_id;
  const mahasiswaId = responseMe?.data?.id;
  console.log("responseMe", responseMe);
  console.log("mahasiswa ID", mahasiswaId);

  if (classId) {
    const responseClass = await GetFetchingData(`v1/classes/${classId}`);
    console.log("responseClass", responseClass);
  }

  return (
    <div className="w-[calc(100vw-18rem)]  ml-2 ">
      <Typography.H2 className="flex flex-col">
        Halaman Dashboard <p className="text-sm font-normal">Informasi Terkait SimuCourt</p>
      </Typography.H2>

      <div className="flex gap-2 mt-4 items-stretch  relative min-h-[400px]">
        <div className="flex-1  ">
          <BlurFade delay={0.05} className="h-full ">
            <CardTatacara />
          </BlurFade>
        </div>
        <div className="w-1/3 ">
          <BlurFade delay={0.3} className="h-full ">
            <CardInformasi />
          </BlurFade>
        </div>
      </div>

      <BlurFade delay={0.5}>
        <div className="flex gap-2 mt-2 w-full">
          <div className="w-full flex gap-2">
            <div className="w-1/2">
              <CardAnggota />
            </div>
            <div className="w-1/2">
              <CardKelompok id={mahasiswaId} />
            </div>
          </div>
          <div className="w-1/2">
            <CardPersidangan />
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
