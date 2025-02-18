import GetFetchingDataSelected from "@/lib/fetching-component-get-selected";
import GetFetchingData from "@/lib/fetching-component-get";
import CardClassClient from "./card-class";

import GetToken from "@/lib/get-token";
import { GetIdUser } from "@/lib/get-id-user";

export default async function CardClassServer() {
  const token = (await GetToken()) ?? "";
  const userId = (await GetIdUser()) ?? "";
  const getUser = await GetFetchingData("v1/auth/me");
  const classId = getUser?.data?.kelas_id ?? null;

  if (!classId) {
    return <p>Tidak ada kelas</p>;
  }

  const response = await GetFetchingDataSelected("v1/classes", classId);

  console.log(response);

  return <CardClassClient classData={response.data} token={token} userId={userId} />;
}
