import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CardInformasi() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Informasi Simucourt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row w-full h-full justify-center items-center gap-2 ">
          <Image src={"/logohukum.png"} width={200} height={20} alt={""} />
          <Image
            src={"/logo_sidebar.png"}
            width={180}
            height={20}
            alt="Logo Laboratorium Hukum"
            className=" p-2 mt-2 rounded-lg dark:bg-white"
          />
        </div>
        <CardDescription className="text-justify">
          SimuCourt dalam sistem ini merupakan kepanjangan dari "Sistem Manajemen Simulasi E-Court”. SimuCourt merupakan salah satu sistem
          pembelajaran praktikum pada Laboratorium Huku, menggunakan metode elektronik yang mengadopsi sistem e-court dari Mahkamah Agung.{" "}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-center items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="w-1/2">
                Penjelasan Ecourt
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apa itu Ecourt?</DialogTitle>
                <DialogDescription className="text-justify">
                  E-court adalah aplikasi yang digunakan untuk pemrosesan administratif, pelayanan perkara, dan persidangan secara
                  elektronik serta layanan aplikasi perkara lainnya yang ditetapkan Mahkamah Agung yang terintegrasi dan tidak terpisahkan
                  dengan SIP (Sistem Informasi Pengadilan). Adapun layanan yang bisa dilakukan dalam sistem E-Court yaitu:
                  <br />
                  <ol className="list-disc pl-5" suppressHydrationWarning>
                    <li>e-Filing (Pendaftaran Perkara Online di Pengadilan)</li>
                    <li>e-Payment (Pembayaran Panjar Biaya Perkara Online)</li>
                    <li>e-Summons (Pemanggilan Pihak secara online)</li>
                    <li>e-Litigation (Persidangan secara online)</li>
                  </ol>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-1/2">
                Dasar Hukum
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dasar hukum</DialogTitle>
                <DialogDescription className="text-justify">
                  <ol className="list-decimal pl-5" suppressHydrationWarning>
                    <li>
                      Peraturan Mahkamah Agung (PERMA) Nomor 1 Tahun 2019 tentang Administrasi Perkara dan Persidangan di Pengadilan Secara
                      Elektronik.
                    </li>
                    <li>
                      Peraturan Mahkamah Agung (PERMA) Nomor 7 Tahun 2022 tentang Perubahan Atas Peraturan Mahkamah Agung Nomor 1 Tahun 2020
                      tentang Administrasi Perkara dan Persidangan di Pengadilan Secara Elektronik.
                    </li>
                    <li>
                      Keputusan Ketua Mahkamah Agung RI Nomor 363/KMA/SK/XII/2022 Tentang Petunjuk Teknis Administrasi Perkara dan
                      Persidangan Perkara Perdata, Perdata Agama, dan Tata Usaha Negara di Pengadilan Secara Elektronik.
                    </li>
                    <li>Peraturan Mahkamah Agung (PERMA) Nomor 3 Tahun 2022 tentang Mediasi di Pengadilan Secara Elektronik.</li>
                    <li>
                      Peraturan Mahkamah Agung (PERMA) Nomor 6 Tahun 2022 tentang Administrasi Pengajuan Upaya Hukum dan Persidangan Kasasi
                      dan Peninjauan Kembali di Mahkamah Agung secara Elektronik.
                    </li>
                    <li>
                      PerMA No.7 Tahun 2022 Tentang Perubahan Atas Peraturan MA No.1 Tahun 2019 Tentang Administrasi Perkara Dan Persidangan
                      Di Pengadilan Secara Elektronik.
                    </li>
                    <li>
                      Keputusan KMA No.363/ KMA/ SK/ XII/ 2022 tentang Petunjuk Teknis Administrasi Dan Persidangan Perkara Perdata, Perdata
                      Agama & Tata Usaha Negara di Pengadilan Secara Elektronik.
                    </li>
                    <li>Surat Edaran Nomor 1 Tahun 2023 Tentang Tata Cara Panggilan Dan Pemberitahuan Melalui Surat Tercatat.</li>
                  </ol>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
