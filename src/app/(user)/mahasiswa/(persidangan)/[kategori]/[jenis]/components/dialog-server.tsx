import DialogForm from "./dialog-form";

interface DialogServerProps {
  token: string;
  userId: number;
  kategoriSidang: string;
  jenisSidang: string;
}

export default function DialogServer({ token, userId, kategoriSidang, jenisSidang }: DialogServerProps) {
  return <DialogForm token={token} userId={userId} kategoriSidang={kategoriSidang} jenisSidang={jenisSidang} />;
}
