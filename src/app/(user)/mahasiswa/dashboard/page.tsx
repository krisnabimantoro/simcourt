import Typography from "@/components/ui/typhography";
import BlurFade from "@/components/ui/blur-fade";
import CardAnggota from "./components/card-anggota-kelompok";
import CardKelompok from "./components/card-detail-kelompok";
import CardInformasi from "./components/card-informasi";
import CardTatacara from "./components/card-tatacara.";
import CardPersidangan from "./components/card-persidangan";

export default function DashboardMahasiswa() {
  return (
    <div className="w-[calc(100vw-18rem)] ml-2 ">
      <Typography.H2 className="flex flex-col">
        Halaman Dashboard{" "}
        <span>
          <p className="text-sm font-normal">Informasi Terkait Sim-Court</p>
        </span>
      </Typography.H2>

      <div className="flex gap-2 mt-4">
        <div className="w-full">
          <BlurFade delay={0.05}>
            <CardTatacara />
          </BlurFade>
        </div>
        <div className="w-1/2 h-full">
          <BlurFade delay={0.3}>
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
              <CardKelompok />
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
