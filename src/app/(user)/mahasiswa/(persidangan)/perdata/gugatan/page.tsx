import Typography from "@/components/ui/typhography";
import { Separator } from "@radix-ui/react-separator";
import { promises as fs } from "fs";

import BlurFade from "@/components/ui/blur-fade";


import { DataTable } from "@/app/(user)/mahasiswa/(persidangan)/perdata/components/data-table";
import { columns } from "@/app/(user)/mahasiswa/(persidangan)/perdata/components/columns";
import path from "path";
import { z } from "zod";
import { taskSchema } from "@/data/schema";

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
        <div className="px-4 mt-6 mb-6">
          <DataTable data={tasks} columns={columns} />
          {/* <ComponentTablePersidangan /> */}
        </div>
      </BlurFade>
    </div>
  );
}
