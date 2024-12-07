import Typography from "@/components/ui/typhography";
import { Separator } from "@radix-ui/react-separator";
import { promises as fs } from "fs";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import BlurFade from "@/components/ui/blur-fade";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/ui/columns";
import path from "path";
import { z } from "zod";
import { taskSchema } from "@/data/schema";
import DialogForm from "../components/dialog-form";

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

async function getTasks() {
  const data = await fs.readFile(path.join(process.cwd(), "src/data/task.json"));

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function Gugatan() {
  const tasks = await getTasks();

  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-3">
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
              <DialogForm />
            </Select>
          </div>
          <DataTable data={tasks} columns={columns} />
        </div>
      </BlurFade>
    </div>
  );
}
