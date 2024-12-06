"use client";
import Typography from "@/components/ui/typhography";
import { Separator } from "@radix-ui/react-separator";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import BlurFade from "@/components/ui/blur-fade";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { useState } from "react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Gugatan() {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-2">
      <Typography.H2 className="flex flex-col">
        Daftar Gugatan Online{" "}
        <div>
          <p className="text-sm font-normal">Klik Nomor Register Pendaftaran Untuk Melihat Detail Pendaftaran</p>
        </div>
      </Typography.H2>
      <Separator />

      <BlurFade delay={0.05}>
        <div className="px-4 mt-6">
          <div className="flex gap-2">
            <Input placeholder="Cari..." />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Perkara" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Detail Status Perkara</SelectLabel>
                  <SelectItem value="all">Semua Perkara</SelectItem>
                  <SelectItem value="terdaftar">Perkara Terdaftar</SelectItem>
                  <SelectItem value="belumterdaftar">Perkara Belum Terdaftar</SelectItem>
                </SelectGroup>
              </SelectContent>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus /> Tambah Gugatan
                  </Button>
                </DialogTrigger>
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle>MEMILIH PENGADILAN TUJUAN MENDAFTAR PERKARA</DialogTitle>
                    {/* <DialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </DialogDescription>
                     */}
                    <br />
                    <Label>Mendaftar pada Pengadilan (Ketik Nama Kota)</Label>
                    <Input placeholder="Pilih Pengadilan atau Ketik Nama Kota Untuk Mencari Cepat" />
                    <br />

                    <Label>Pembiayaan Perkara</Label>
                    <Select onValueChange={(value) => setSelectedValue(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Status Pembayaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nonProdeo">Sudah Membayar</SelectItem>
                        <SelectItem value="prodeo">Prodeo</SelectItem>
                      </SelectContent>
                    </Select>

                    {selectedValue === "prodeo" && <div className="mt-4"></div>}
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit">Lanjut Pendaftaran</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Select>
          </div>

          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell className="hover:cursor-pointer">
                    <Link href={"/persidangan/pendaftaran"}>{invoice.paymentMethod}</Link>
                  </TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </div>
      </BlurFade>
    </div>
  );
}
