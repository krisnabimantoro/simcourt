"use server";
import { cookies } from "next/headers";
export  async function delSession() {
  const session = (await cookies()).get("session")?.value || "";
  if (session) {
    (await cookies()).delete("session");
  }
}
