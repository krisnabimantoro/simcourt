"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputDateWIthLabel } from "@/components/ui/input-date-req";
import InputWithLabelReq from "@/components/ui/input-with-label-req";
import InputWithLabelReqPembayaran from "../input-with-label-pembayaan";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface PendaftaranSectionProps {
  token: string;
  id: string;
}

export default function PembayaranJuruSita({ token, id }: PendaftaranSectionProps) {
  const [tanggalPerkara, setTanggalPerkara] = useState("");
  const [uraian, setUraian] = useState("");
  const [pemasukan, setPemasukan] = useState("");
  const [pengeluaran, setPengeluaran] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState("");

  const handlePemasukanChange = (e: any) => {
    setPemasukan(e.target.value);
    if (e.target.value) setPengeluaran("");
  };

  const handlePengeluaranChange = (e: any) => {
    setPengeluaran(e.target.value);
    if (e.target.value) setPemasukan("");
  };

  const fetchPembayaranData = async (): Promise<any> => {
    const response = await fetch(`http://127.0.0.1:8020/api/v1/pembayaran/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  };

  const fetchData = async () => {
    try {
      const result = await fetchPembayaranData();
      console.log("Fetched Data:", result);
      setItems(result.data);
      setTotalItems(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData when the component is rendered
  useState(() => {
    fetchData();
  },);

  console.log("Items:", items);
  console.log("Total Items:", totalItems);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pemasukanValue = parseInt(pemasukan) || 0;
    const pengeluaranValue = parseInt(pengeluaran) || 0;
    // const sisa = pemasukanValue - pengeluaranValue;

    const payload = {
      detail_pendaftaran_id: parseInt(id),
      tanggal_perkara: tanggalPerkara,
      uraian,
      pemasukan: pemasukanValue,
      pengeluaran: pengeluaranValue,
      // sisa,
    };

    console.log("Payload:", payload);
    try {
      const response = await fetch("http://127.0.0.1:8020/api/v1/pembayaran", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Only Authorization header needed for FormData
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload), // Correctly send FormData without JSON.stringify
      });


      if (!response.ok) throw new Error("Failed to submit");

      const result = await response.json();
      console.log("Success:", result);
      fetchData(); // Revalidate the data after successful submission
      // Optionally reset form
      setTanggalPerkara("");
      setUraian("");
      setPemasukan("");
      setPengeluaran("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Pembayaran (e-payment)</CardTitle>
        <CardDescription>Juru Sita</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          <div className="grid grid-cols-4 space-x-4 items-end">
            <InputDateWIthLabel
              name={"input"}
              label={"Tanggal Perkara"}
              value={tanggalPerkara}
              onChange={(e: any) => setTanggalPerkara(e.target.value)}
            />
            <InputWithLabelReq
              label={"Uraian"}
              placeholder={"Uraikan biaya perkara"}
              name={"uraian"}
              type={"text"}
              value={uraian}
              onChange={(e: any) => setUraian(e.target.value)}
            />
            <InputWithLabelReqPembayaran
              label={"Pemasukan"}
              placeholder={"Rp. 0"}
              name={"pemasukan"}
              type={"number"}
              value={pemasukan}
              onChange={handlePemasukanChange}
              disabled={!!pengeluaran}
            />
            <InputWithLabelReqPembayaran
              label={"Pengeluaran"}
              placeholder={"Rp. 0"}
              name={"pengeluaran"}
              type={"number"}
              value={pengeluaran}
              onChange={handlePengeluaranChange}
              disabled={!!pemasukan}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button className="self-end" type="submit">
              Submit
            </Button>
          </div>
        </form> 
      </CardContent>
      <CardFooter>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>No. </TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Uraian</TableHead>
              <TableHead>Pemasukan (Rp.)</TableHead>
              <TableHead>Pengeluaran (Rp.)</TableHead>
              <TableHead>Sisa (Rp.)</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item) => (
              <TableRow key={item?.id}>
              <TableCell className="font-medium">{item?.id || "-"}</TableCell>
              <TableCell>{item?.tanggal_perkara || "-"}</TableCell>
              <TableCell>{item?.uraian || "-"}</TableCell>
              <TableCell>{item?.pemasukan || "-"}</TableCell>
              <TableCell>{item?.pengeluaran || "-"}</TableCell>
              <TableCell>{item?.sisa || "-"}</TableCell>
              <TableCell>
                <Pencil className="hover:cursor-pointer" />
              </TableCell>
              </TableRow>
            ))}
          
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardFooter>
    </Card>
  );
}
