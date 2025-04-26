import Typography from "@/components/ui/typhography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact, Info, Phone } from "lucide-react";
const items = [
  {
    id: "5",
    title: "Apa yang dimaksud dengan sistem hukum?",
    content:
      "Sistem hukum adalah kumpulan aturan dan prinsip yang mengatur kehidupan masyarakat serta diterapkan oleh lembaga peradilan untuk menegakkan keadilan.",
  },
  {
    id: "6",
    title: "Apa perbedaan antara hukum perdata dan hukum pidana?",
    content:
      "Hukum perdata mengatur hubungan antara individu atau badan hukum dalam hal hak dan kewajiban, sedangkan hukum pidana mengatur pelanggaran terhadap ketertiban umum dan menetapkan sanksi bagi pelanggarnya.",
  },
  {
    id: "7",
    title: "Bagaimana cara mengajukan gugatan di pengadilan?",
    content:
      "Untuk mengajukan gugatan, seseorang harus menyiapkan dokumen gugatan, membayar biaya perkara, dan menyerahkannya ke pengadilan yang berwenang. Proses ini juga bisa dibantu oleh pengacara.",
  },
  {
    id: "8",
    title: "Apa perbedaan antara advokat, pengacara, dan notaris?",
    content:
      "Advokat adalah seseorang yang memberikan jasa hukum, termasuk di pengadilan. Pengacara adalah advokat yang secara khusus memberikan bantuan hukum kepada klien. Notaris adalah pejabat yang membuat akta autentik dan memberikan legalitas pada dokumen hukum.",
  },
  {
    id: "9",
    title: "Apa itu asas legalitas dalam hukum pidana?",
    content:
      "Asas legalitas berarti seseorang tidak dapat dihukum kecuali berdasarkan aturan hukum yang telah ditetapkan sebelumnya (nullum crimen sine lege).",
  },
  {
    id: "10",
    title: "Bagaimana cara mendapatkan bantuan hukum gratis?",
    content:
      "Bantuan hukum gratis dapat diperoleh melalui Lembaga Bantuan Hukum (LBH) atau organisasi yang menyediakan bantuan hukum bagi masyarakat kurang mampu.",
  },
];

export default function faq() {
  return (
    <div className="w-[calc(100vw-18rem)]  ml-2">
      {" "}
      <Typography.H2 className="flex flex-col">
        Halaman FAQ <p className="text-sm font-normal">Berisi pertanyaan yang sering ditanyakan</p>
      </Typography.H2>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>FAQ SimuCourt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 ">
            <Accordion type="single" collapsible className="w-full" defaultValue="3">
              {items.map((item) => (
                <AccordionItem value={item.id} key={item.id} className="py-2">
                  <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">{item.title}</AccordionTrigger>
                  <AccordionContent className="pb-2 text-muted-foreground">{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
        <CardFooter>
          <div className="rounded-lg border border-border px-4 py-3">
            <p className="text-sm">
              <Phone className="-mt-0.5 me-3 inline-flex text-blue-500" size={16} strokeWidth={2} aria-hidden="true" />
              Kontak: +628 3180 123 a/n Krisna
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
