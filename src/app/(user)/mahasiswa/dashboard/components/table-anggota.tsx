  "use client";

  import { useEffect, useState } from "react";
  import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
  import { Input } from "@/components/ui/input";
  import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import GetFetchingData from "@/lib/fetching-component-get";
  import GetToken from "@/lib/get-token";
  import SelectButtonGroup from "./client-component/select-button-group";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export default function TableAnggota({ response, userToken }: { response: any; userToken: any }) {
    const [students, setStudents] = useState<any[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState("all");
    const [token, setToken] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        setStudents(response.data);
        setFilteredStudents(response.data);
        setToken(userToken || "");
      };

      fetchData();
    }, []);

    useEffect(() => {
      let data = students;

      if (search.trim()) {
        data = data.filter(
          (item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.nim.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (tab === "selected") {
        data = data.filter((item) => item.selected); // requires `selected` field
      } else if (tab === "not_selected") {
        data = data.filter((item) => !item.selected);
      }

      setFilteredStudents(data);
    }, [search, tab, students]);

    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Input placeholder="Cari nama atau NIM..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full " />

        </div>

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
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Tidak ada data ditemukan
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.nim}</TableCell>
                  <TableCell className="text-right">
                    <SelectButtonGroup mahasiswa_id={item.mahasiswa_id} group_id={1} token={token} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
