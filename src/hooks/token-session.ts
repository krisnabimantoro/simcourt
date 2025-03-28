'use client'

import { useSession } from "next-auth/react";

export default function TokenSession() {
  const { data: session } = useSession();
  console.log(session);
  return session;
}
