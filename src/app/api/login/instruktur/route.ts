import { NextResponse } from "next/server";

import { createSession } from "@/lib/session";
import url_fetch from "@/constant/data-fetching";

export async function POST(req: Request) {
  const { nip, password } = await req.json();
  //   const cookieStore = await cookies();

  // const user = data.find((user) => user.nim === nim && user.password === password);

  const response = await fetch(`${url_fetch}/v1/auth/login/instruktur`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nip, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ message: "Login gagal, periksa kembali NIP atau password!" }, { status: 401 });
  }

  await createSession(data.token);

  return NextResponse.json({ message: "Login berhasil" }, { status: 200 });
}

// Simpan token di cookies (HttpOnly lebih aman)
// cookieStore.set("token", user.token, { httpOnly: true, secure: true, path: "/" });
