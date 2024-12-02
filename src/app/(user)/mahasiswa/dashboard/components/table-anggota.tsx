import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TableAnggota() {
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
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>Krisna Bimantoro</TableCell>
          <TableCell>202210370311254</TableCell>
          <TableCell className="text-right">
            <Badge className="hover:cursor-pointer" >Pilih</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
