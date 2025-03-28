import GetToken from "@/lib/get-token";
import PendfataranSidangClient from "./persidangan-client";

export default async function PendaftaranSidang({ params }: { params: { id: string } }) {
  const { id } = await params;

  const token = (await GetToken()) || "";

  return (
    <PendfataranSidangClient
      token={token}
      params={{
        id: id,
      }}
    />
  );
}
