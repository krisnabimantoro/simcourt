import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import GetFetchingData from "@/lib/fetching-component-get";

export default async function TableAnggota() {
  const response = await GetFetchingData("v1/students");
  

  return (
    <Table>
      <TableCaption>List Anggota</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>NIM</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {response.data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.nim}</TableCell>
            <TableCell className="text-right">
              <Badge className="hover:cursor-pointer">Pilih</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
