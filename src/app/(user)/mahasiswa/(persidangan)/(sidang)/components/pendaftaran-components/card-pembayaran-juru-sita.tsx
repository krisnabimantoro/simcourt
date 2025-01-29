/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputDateWIthLabel } from "@/components/ui/input-date-req";
import InputWithLabelReq from "@/components/ui/input-with-label-req";
import Form from "next/form";

import { useState } from "react";
import InputWithLabelReqPembayaran from "../input-with-label-pembayaan";
import { Button } from "@/components/ui/button";

export default function PembayaranJuruSita() {
  const [pemasukan, setPemasukan] = useState("");
  const [pengeluaran, setPengeluaran] = useState("");

  const handlePemasukanChange = (e: any) => {
    setPemasukan(e.target.value);
    if (e.target.value) {
      setPengeluaran("");
    }
  };

  const handlePengeluaranChange = (e: any) => {
    setPengeluaran(e.target.value);
    if (e.target.value) {
      setPemasukan("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pembayaran (e-payment)</CardTitle>
        <CardDescription>Juru Sita</CardDescription>
      </CardHeader>
      <CardContent>
        <Form action="" className="w-full space-y-2">
          {/* On submission, the input value will be appended to 
            the URL, e.g. /search?query=abc */}
          <div className="grid grid-cols-4 space-x-4 items-end">
            <InputDateWIthLabel label={"Tanggal Perkara"} />
            <InputWithLabelReq label={"Uraian"} placeholder={"Uraikan biaya perkara"} name={"uraian"} type={"text"} />
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
        </Form>

      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
