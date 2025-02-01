import url_fetch from "@/constant/data-fetching";
import { toast } from "@/hooks/use-toast";
import { GetToken } from "@/lib/get-token";

import { NextResponse } from "next/server";
export default async function GetFetchingData(url: string) {
  const token = await GetToken();

  if (!token) {
    toast({ title: "Sesi anda berakhir", description: "Silahkan login kembali" });
    return NextResponse.redirect(new URL("/auth"));
  } else {
    const response = await fetch(`${url_fetch}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
}
