export type SessionPayload = {
    id: number;        // ID pengguna
    nim?: string;       // NIM (Nomor Induk Mahasiswa atau Nomor Identitas)
    name: string;      // Nama pengguna
    email?: string;     // Email pengguna
    role?: string;      // Peran pengguna (misal: hakim, juru sita)
    jabatan?: string;   // Jabatan pengguna
    exp?: number;      // Expiry time dari token (opsional, karena setExpirationTime sudah ada)
  };
  