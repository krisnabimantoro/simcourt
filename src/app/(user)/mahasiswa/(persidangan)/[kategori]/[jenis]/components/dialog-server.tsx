
import { GetToken } from "@/lib/get-token";
import { GetIdUser } from "@/lib/get-id-user";
import DialogForm from "./dialog-form";

export default async function DialogServer() {
  const token = (await GetToken()) ?? "";
  const userId = (await GetIdUser()) ?? "";

  return <DialogForm token={token} userId={userId}/>;
}
