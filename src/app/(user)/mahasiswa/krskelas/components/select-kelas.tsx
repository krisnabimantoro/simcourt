import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import GetFetchingData from "@/lib/fetching-component-get";

export default async function ComponentSelectClass() {
  const datas = await GetFetchingData("v1/classes");

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {datas.data.map((data: { id: string; name: string; code: string }) => (
          <AccordionItem value={data.id} key={data.id} className="rounded-lg border bg-background px-4 py-1">
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">{data.name}</AccordionTrigger>
            <AccordionContent className="pb-2 text-muted-foreground">
              <Card className="w-full my-2">
                <CardHeader>
                  <CardDescription className="hover:cursor-pointer">{data.code}</CardDescription>
                </CardHeader>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
