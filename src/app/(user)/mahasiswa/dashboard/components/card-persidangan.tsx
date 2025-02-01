import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const status = [
  {
    noSidang: "INV001",
    status: "selesai",
  },
  {
    noSidang: "INV002",
    status: "dibatalkan",
  },
  {
    noSidang: "INV003",
    status: "selesai",
  },
  {
    noSidang: "INV004",
    status: "tertunda",
  },
  {
    noSidang: "INV005",
    status: "selesai",
  },
  {
    noSidang: "INV006",
    status: "selesai",
  },
  {
    noSidang: "INV007",
    status: "selesai",
  },
];

export default function CardPersidangan() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Informasi Persidangan</CardTitle>
        {/* <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. </CardDescription> */}
      </CardHeader>
      <CardContent>
        <TablePersidangan />
      </CardContent>
    </Card>
  );
}

export function TablePersidangan() {
  return (
    <div className=" max-h-[120px] overflow-y-auto ">
      <Table className="">
        {/* <TableCaption>A list of your recent noSidangs.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Persidangan</TableHead>

            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        {/* <ScrollArea className="h-[120px] w-full rounded-md border "> */}
        <TableBody className="">
          {status.map((sidang) => (
            <TableRow key={sidang.noSidang}>
              <TableCell className="font-medium">{sidang.noSidang}</TableCell>
              <TableCell className="text-right">{sidang.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* </ScrollArea> */}
      </Table>
    </div>
  );
}
