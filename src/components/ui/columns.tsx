"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "./checkbox";
import { Badge } from "./badge";
import { labels, priorities, statuses } from "@/data/data";
import { DataTableColumnHeader } from "../../app/(user)/mahasiswa/(persidangan)/perdata/components/data-table-column-headet";
import { DataTableRowActions } from "../../app/(user)/mahasiswa/(persidangan)/perdata/components/data-table-row-action";
import { Task } from "@/data/schema";
import Link from "next/link";

export const columns: ColumnDef<Task>[] = [

  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
    cell: ({ row }) => <div className="w-fit">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "kode_register",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kode & Tanggal Register" />,
    cell: ({ row }) => {
      const kodeRegister = row.getValue("kode_register");
      const tanggalRegister = row.original.tanggal_register;

      return (
        <div className="flex flex-col space-x-2">
          <Link href={"../persidangan"}>
            <Badge variant="outline">{kodeRegister as string}</Badge>
          </Link>
          <span className="max-w-[500px] truncate font-medium">{tanggalRegister}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "status_pembayaran",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status Pembayaran" />,
    cell: ({ row }) => {
      const statusPembayaran = row.getValue("status_pembayaran");

      if (!statusPembayaran) {
        return null;
      }

      return (
        <div className="flex flex-col space-x-2">
          <Badge className="w-fit" variant="outline">
            {statusPembayaran as string}
          </Badge>
          <Link href={"../persidangan"}>
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
    accessorKey: "status_pendaftaran",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status Pendaftaran" />,
    cell: ({ row }) => {
      const statusPendaftaran = row.getValue("status_pendaftaran");

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
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
