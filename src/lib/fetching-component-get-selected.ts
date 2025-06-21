import NEXT_PUBLIC_URL_FETCH from "@/constant/data-fetching";
import GetToken from "@/lib/get-token";

import { redirect } from "next/navigation";
export default async function GetFetchingDataSelected(url: string, id: any) {
  const token = await GetToken();
  const url_auth = process.env.URL_AUTH;
  const response = await fetch(`${url_auth}/api/${url}/${id}`, {
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
