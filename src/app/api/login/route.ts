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

const url_fetch = process.env.URL_FETCH;

export async function POST(req: Request) {
  const { nim, password } = await req.json();
  //   const cookieStore = await cookies();

  // const user = data.find((user) => user.nim === nim && user.password === password);

  const response = await fetch(`${url_fetch}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nim, password }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    return NextResponse.json({ message: "Login gagal, periksa kembali NIM atau password!" }, { status: 401 });
  }

  await createSession(data.token);

  return NextResponse.json({ message: "Login berhasil",}, { status: 200 });
}

// Simpan token di cookies (HttpOnly lebih aman)
// cookieStore.set("token", user.token, { httpOnly: true, secure: true, path: "/" });
