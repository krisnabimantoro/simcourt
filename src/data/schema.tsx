import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  // id: z.number(),
  // no_pendaftaran: z.string().nullable(),
  // created_at: z.string().nullable(),
  // status_pembayaran: z.string().nullable(),
  // konfirmasi: z.string().nullable(),
  // status_pendaftaran: z.string().nullable(),
  // jumlah_panjar: z.number().nullable(),
  // nomor_perkara: z.string().nullable(),
  // tanggal_pendaftaran: z.string().nullable(),
});

export type Task = z.infer<typeof taskSchema>;
