import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function GetIdUser(){
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);
  return payload?.sub;
}
