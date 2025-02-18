import { Token } from "./token";

export default async function GetToken() {
  const GetToken = await Token();
  return GetToken;
}
