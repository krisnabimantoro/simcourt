import url_fetch from "@/constant/data-fetching";
import { GetToken } from "@/lib/get-token";

export default async function GetFetchingData(url: string) {
  const token = await GetToken();

  const response = await fetch(`${url_fetch}/${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
