import { GetIdUser } from "@/lib/get-id-user";
import ClientAdvokat from "./clientAdvokat";
import GetToken from "@/lib/get-token";
import GetFetchingData from "@/lib/fetching-component-get";

export default async function Advokat() {
  const token = (await GetToken()) ?? "";
  const userId = await GetIdUser();
  const user = await GetFetchingData("v1/auth/me");

  const classId = user.data.kelas_id;
  return <ClientAdvokat token={token} userId={userId} classId={classId} />;
}
