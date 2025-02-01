"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { statusPendaftaran } from "@/data/data";
import DialogForm from "./dialog-form";

// import { Button } from "@/registry/new-york/ui/button"
// import { Input } from "@/registry/new-york/ui/input"
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options"

// import { priorities, statuses } from "../data/data"
// import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2 mb">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Cari Persidangan berdasarkan Kode Register"
          value={(table.getColumn("kode_register")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("kode_register")?.setFilterValue(event.target.value)}
          className="h-8 w-full"
        />
        {table.getColumn("status_pendaftaran") && (
          <DataTableFacetedFilter column={table.getColumn("status_pendaftaran")} title="Filter Pendaftaran" options={statusPendaftaran} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      <DialogForm />
    </div>
  );
}
