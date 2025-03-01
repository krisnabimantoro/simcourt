"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-headet";
import { Task } from "@/data/schema";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
    cell: ({ row }) => <div className="w-fit">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "no_pendaftaran",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kode & Tanggal Register" />,
    cell: ({ row }) => {
      const kodeRegister = row.getValue("no_pendaftaran");
      const tanggalRegister = (row.original as { created_at?: string }).created_at;
      const detailPendaftaranId = row.getValue("id");
      console.log(detailPendaftaranId);

      return (
        <div className="flex flex-col space-x-2">
          <Link href={`../persidangan/${detailPendaftaranId}`}>
            <Badge variant="outline" className="text-destructive">
              {kodeRegister as string}
            </Badge>
          </Link>
          <span className="max-w-[500px] truncate font-medium">
            {tanggalRegister
              ? new Date(tanggalRegister as string).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Tanggal tidak tersedia"}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "status_pihak",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status Pembayaran" />,
    cell: ({ row }) => {
      const statusPembayaran =
        (row.original as { pendaftaran_sidang?: { pihak?: { status_pihak?: string }[] } }).pendaftaran_sidang?.pihak?.[0]?.status_pihak ??
        "Tidak tersedia";
      if (!statusPembayaran) {
        return null;
      }

      return (
        <div className="flex flex-col space-x-2">
          <Badge className="w-fit" variant="outline">
            {statusPembayaran as string}
          </Badge>
          <Link href={`../persidangan`}>
            <span className="max-w-[500px] truncate font-medium text-blue-600">(Konfirmasi Otomatis)</span>
          </Link>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "no_pendaftaran",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status Pendaftaran" />,
    cell: ({ row }) => {
      const statusPendaftaran = "Terdaftar";

      if (!statusPendaftaran) {
        return null;
      }

      return (
        <div className="flex flex-col space-x-2">
          <Badge className="w-fit" variant="outline">
            {statusPendaftaran as string}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "jumlah_panjar",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Jumlah Panjar Perkara" />,
    cell: ({ row }) => {
      const panjar = row.getValue("jumlah_panjar");

      if (!panjar) {
        return null;
      }

      return <div className="flex flex-col space-x-2">Rp. {panjar as string}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "nomor_perkara",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Perkara & Tanggal Pendaftaran" />,
    cell: ({ row }) => {
      const nomorPerkara = row.getValue("nomor_perkara");
      const tanggalPendaftaran = row.original.tanggal_pendaftaran;

      return (
        <div className="flex flex-col space-x-2">
          <Link href={"../persidangan"}>
            <Badge variant="outline">{nomorPerkara as string}</Badge>
          </Link>
          <span className="max-w-[500px] truncate font-medium">{tanggalPendaftaran}</span>
        </div>
      );
    },
  },
];
