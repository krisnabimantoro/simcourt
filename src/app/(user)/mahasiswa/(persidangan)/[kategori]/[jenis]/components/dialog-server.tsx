
import DialogForm from "./dialog-form";

interface DialogServerProps {
  token: string;
  userId: string;
}

export default function DialogServer({ token, userId }: DialogServerProps) {
  return <DialogForm token={token} userId={userId} />;
}
