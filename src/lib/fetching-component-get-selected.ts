import url_fetch from "@/constant/data-fetching";
import GetToken  from "@/lib/get-token";

import { redirect } from "next/navigation";
export default async function GetFetchingDataSelected(url: string, id: string) {
  const token = await GetToken();

  const response = await fetch(`${url_fetch}/${url}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (response.status === 401) {
    if (response.status === 401) {
      redirect("/auth"); // Redirects using next/navigation
    }
  } else {
    return response.json();
  }
}
