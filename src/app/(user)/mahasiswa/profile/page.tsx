import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typhography";
import Image from "next/image";

export default function profile() {
  return (
    <div className="w-[calc(100vw-18rem)]  ml-2">
      <div className="flex space-x-4">
        <div className="w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Typography.H2>Krisna Bimantoro</Typography.H2>
              </CardTitle>
              <CardDescription>202210370311254</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="/krisna.png" width={3000} height={3000} alt="Logo Laboratorium Hukum" className="rounded-lg" />
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Detail Akun</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/70">
              Nama Lengkap
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
