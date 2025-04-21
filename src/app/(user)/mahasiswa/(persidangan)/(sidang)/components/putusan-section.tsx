import CardPutusanAkhir from "./putusan-components/card-putusan-akhir";
import CardPutusanSela from "./putusan-components/card-putusan-sela";

interface PutusanSectionProps {
  token: string;
  id: string;
  data_user: any;
}

export default function PutusanSidang({ token, id, data_user }: PutusanSectionProps) {
  return (
    <div>
      {/* <CardPutusanSela /> */}
      <CardPutusanAkhir token={token} id={id} data_user={data_user} />
    </div>
  );
}
