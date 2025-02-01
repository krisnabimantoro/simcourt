import { NextResponse } from "next/server";

import { createSession } from "@/lib/session";

const data = [
  {
    id: 1,
    nim: "2022",
    name: "krisna",
    email: "krisnabmntr@gmail.com",
    password: "123",
    role: "hakim",
    jabatan: "koordinator",
  },
  {
    id: 2,
    nim: "2023",
    name: "fatih",
    email: "fatih@gmail.com",
    password: "123",
    role: "juru sita",
    jabatan: "anggota",
  },
];

export async function POST(req: Request) {
  const { nim, password } = await req.json();
  //   const cookieStore = await cookies();

  const user = data.find((user) => user.nim === nim && user.password === password);

  if (!user) {
    return NextResponse.json({ message: "Login gagal" }, { status: 401 });
  }

  await createSession(user.id, user.name);
  return NextResponse.json({ message: "Login berhasil", userId: user.id }, { status: 200 });
}

// Simpan token di cookies (HttpOnly lebih aman)
// cookieStore.set("token", user.token, { httpOnly: true, secure: true, path: "/" });
