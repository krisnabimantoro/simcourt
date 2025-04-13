"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GetFetchingData from "@/lib/fetching-component-get";
import GetToken from "@/lib/get-token";
import SelectButtonGroup from "./client-component/select-button-group";
import { set } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableAnggota({ response, userToken, listGroups }: { response: any; userToken: any; listGroups: any }) {
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [listGroupsStudents, setListGroupsStudents] = useState<any[]>([]);
  const [tab, setTab] = useState("all");
  const [token, setToken] = useState("");
  const [dataStudentGroups, setDataStudentGroups] = useState<any[]>([]);
  const [groupId, setGroupId] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setStudents(response.data);
      setFilteredStudents(response.data);
      setListGroupsStudents(listGroups.data[0]?.students ?? []); // Handle undefined case
      setDataStudentGroups(listGroups.data[0] ?? []); // Handle undefined case
      setToken(userToken || "");
      setGroupId(listGroups.data[0]?.pivot.group_id ?? null); // Handle undefined case
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

  console.log("listGroupsStudents", listGroupsStudents);
  console.log("dataStudentGroups", dataStudentGroups);
  console.log("groupId", groupId);


  if (listGroupsStudents.some((student) => student.nim)) {
    console.log("NIM exists in listGroupsStudents");
    
  }
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
            filteredStudents.map((item, index) => {
              const isDuplicateNIM = (listGroupsStudents ?? []).some((student) => student.nim === item.nim);
              const datanim = (listGroupsStudents ?? []).find((student) => student.nim === item.nim);
              console.log("datanim", isDuplicateNIM);

              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.nim}</TableCell>
                  <TableCell className="text-right">
                    <SelectButtonGroup
                      mahasiswa_id={item.mahasiswa_id}
                      group_id={groupId}
                      token={token}
                      listGroups={listGroupsStudents ?? []}
                      duplicated={isDuplicateNIM}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
