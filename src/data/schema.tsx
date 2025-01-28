import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  kode_register: z.string(),
  tanggal_register: z.string(),
  status_pembayaran: z.string(),
  konfirmasi: z.string(),
  status_pendaftaran: z.string(),
  jumlah_panjar: z.number(),
  nomor_perkara: z.string(),
  tanggal_pendaftaran: z.string().nullable(),
});

export type Task = z.infer<typeof taskSchema>;
