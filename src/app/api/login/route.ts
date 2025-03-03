import { NextResponse } from "next/server";

import { createSession } from "@/lib/session";
import url_fetch from "@/constant/data-fetching";

export async function POST(req: Request) {
  const { nim, password } = await req.json();
  //   const cookieStore = await cookies();

  // const user = data.find((user) => user.nim === nim && user.password === password);
  try {
    const response = await fetch(`http://127.0.0.1:8020/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nim, password }),
    });

    
  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    return NextResponse.json({ message: "Login gagal, periksa kembali NIM atau password!" }, { status: 401 });
  }

  await createSession(data.token);


  } catch (error) {
    console.error(error);
  }


  return NextResponse.json({ message: "Login berhasil" }, { status: 200 });
}

// Simpan token di cookies (HttpOnly lebih aman)
// cookieStore.set("token", user.token, { httpOnly: true, secure: true, path: "/" });
