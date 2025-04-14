import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
    console.log("Parsed body:", body);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { nim, password } = body;

  try {
    const response = await fetch(`http://host.docker.internal:8020/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nim, password }),
    });

    const data = await response.json();
    console.log("Login API response:", data);

    if (!response.ok) {
      return NextResponse.json({ message: "Login gagal, periksa kembali NIM atau password!" }, { status: 401 });
    }

    if (!data.token) {
      console.error("Token missing in login response");
      return NextResponse.json({ message: "Token tidak ditemukan" }, { status: 500 });
    }

    await createSession(data.token);

    return NextResponse.json({ message: "Login berhasil" }, { status: 200 });
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
