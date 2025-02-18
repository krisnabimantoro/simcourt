import { cookies } from "next/headers";

export  async function Token() {
  const session = (await cookies()).get("session")?.value;

  return session;
}
