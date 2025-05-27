import Typography from "@/components/ui/typhography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact, Info, Phone } from "lucide-react";
const items = [
  {
    id: "1",
    title: "Bagaimana cara memetakan kelompok sidang?",
    content:
      "Dengan cara koordinator memilih anggota kelompok pada halaman dashboard, kemudian memberikan role untuk setiap anggota kelompok, seperti hakim, panitera pengganti dll",
  },
  {
    id: "2",
    title: "Bagaimana jika saya akan berpindah kelompok sidang?",
    content:
      "Kamu dapat menghubungi koordinator kelompok asal kamu untuk menghapus dari kelompok sebelumnya, kemudian koordinator kelompok baru dapat menambahkan kamu ke dalam kelompoknya.",
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
              Kontak: +62 821-4271-0611 (Laboratorium Hukum UMM)
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
