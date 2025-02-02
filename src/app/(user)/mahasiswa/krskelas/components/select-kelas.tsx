import GetFetchingData from "@/lib/fetching-component-get";
import { GetToken } from "@/lib/get-token";
import { GetIdUser } from "@/lib/get-id-user";
import ClientSelectClass from "./client-select-class";
export default async function ComponentSelectClass() {
  const datas = await GetFetchingData("v1/classes");
  const token = (await GetToken()) ?? "";
  const userId = (await GetIdUser()) ?? "";

  return <ClientSelectClass classes={datas.data} token={token} userId={userId} />;
}
