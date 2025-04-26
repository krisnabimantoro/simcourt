import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CardInformasi() {
  return (
    <Card className={cn("h-full")}>
      <CardHeader>
        <CardTitle>Informasi Simucourt</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. </CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={"/logohukum.png"} width={260} height={20} alt={""} />
      </CardContent>
      <CardFooter>
        <p className="font-bold">
          Ecourt adalah <span className="font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. ?Libero ullam, magnam asperiores facere, omnis corrupti sequi dolore architecto totam dicta error suscipit doloremque, necessitatibus vitae a laborum recusandae. Voluptas, eos</span>
        </p>
      </CardFooter>
    </Card>
  );
}
