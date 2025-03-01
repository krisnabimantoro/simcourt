import Typography from "@/components/ui/typhography";
import { Separator } from "@radix-ui/react-separator";
import { promises as fs } from "fs";

import BlurFade from "@/components/ui/blur-fade";
import path from "path";
import { z } from "zod";
import { taskSchema } from "@/data/schema";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import DialogServer from "./components/dialog-server";
import GetToken from "@/lib/get-token";
import { GetIdUser } from "@/lib/get-id-user";
import GetFetchingData from "@/lib/fetching-component-get";

async function getTasks() {
  // const data = await fs.readFile(path.join(process.cwd(), "src/data/task.json"));

  const data = await GetFetchingData("v1/detail-pendaftarans");

  console.log(data.data);
  // const tasks = JSON.parse(data.toString());
  // console.log(z.array(taskSchema).parse(data.data));

  return data.data;
}

interface persidanganProps {
  params: { kategori: string; jenis: string };
}
export default async function PersidanganTable({ params }: persidanganProps) {
  const { kategori, jenis } = await params;
  const tasks = await getTasks();
  const token = (await GetToken()) ?? "";
  const userId = (await GetIdUser()) ?? 0;

  return (
    <div className="h-screen w-[calc(100vw-18rem)] flex flex-col ml-3">
      <Typography.H2 className="flex flex-col">
        Daftar {jenis} Online{" "}
        <div>
          <p className="text-sm font-normal">Klik Nomor Register Pendaftaran Untuk Melihat Detail Pendaftaran {kategori}</p>
        </div>
      </Typography.H2>
      <Separator />

      <BlurFade delay={0.05}>
        <div className="px-4 mt-6 space-y-2 mb-6">
          <DialogServer token={token} userId={userId} kategoriSidang={kategori} jenisSidang={jenis} />
          <DataTable data={tasks} columns={columns} />
          {/* <ComponentTablePersidangan /> */}
        </div>
      </BlurFade>
    </div>
  );
}
