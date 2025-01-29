import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

const items = [
  {
    id: "1",
    title: "Hukum Perdata",
    content: ["Kelas A", "Kelas B", "Kelas C", "Kelas D", "Kelas E", "Kelas F", "Kelas G", "Kelas H", "Kelas I", "Kelas J", "Kelas K"],
  },
  {
    id: "2",
    title: "Hukum Pidana",
    content: ["Kelas A", "Kelas B", "Kelas C", "Kelas D", "Kelas E", "Kelas F", "Kelas G", "Kelas H", "Kelas I", "Kelas J", "Kelas K"],
  },
  {
    id: "3",
    title: "Hukum administrasi negara",
    content: ["Kelas A", "Kelas B", "Kelas C", "Kelas D", "Kelas E", "Kelas F", "Kelas G", "Kelas H", "Kelas I", "Kelas J", "Kelas K"],
  },
  {
    id: "4",
    title: "Hukum Lingkungan",
    content: ["Kelas A", "Kelas B", "Kelas C", "Kelas D", "Kelas E", "Kelas F", "Kelas G", "Kelas H", "Kelas I", "Kelas J", "Kelas K"],
  },
];

export default function ComponentSelectClass() {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-2" >
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="rounded-lg border bg-background px-4 py-1">
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">{item.title}</AccordionTrigger>
            <AccordionContent className="pb-2 text-muted-foreground">
              {item.content.map((content, index) => (
                <div key={index}>
                  <Card className="w-full my-2">
                    <CardHeader>
                      <CardDescription className="hover:cursor-pointer">{content}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
