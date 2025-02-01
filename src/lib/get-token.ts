import { cookies } from "next/headers";

export async function GetToken() {
  const session = (await cookies()).get("session")?.value;

  return session;
}
