import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const { nim, password } = await req.json();
  const url = process.env.URL_AUTH;
  console.log("URL_AUTH:", url); // Log the URL for debugging
  try {
    console.log("Request body:", { nim, password }); // Log the request body for debugging
    const response = await fetch(`${url}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nim, password }),
    });

    const data = await response.json();
    console.log("Response from login API:", data);

    if (!response.ok) {
      return NextResponse.json({ message: "Login gagal, periksa kembali NIM atau password!" }, { status: 401 });
    }

    await createSession(data.token);

    return NextResponse.json({ message: "Login berhasil" }, { status: 200 }); // ✅ move inside try
  } catch (error) {
    console.error("Error in login handler:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 }); // Optional: better error handling
  }
}
