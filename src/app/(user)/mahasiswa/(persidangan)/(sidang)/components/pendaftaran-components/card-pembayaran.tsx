import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typhography";


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CardPembayaran() {
    return (
        <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle>Pembayaran (e-Payment)</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />

          <div className="grid grid-cols-2 gap-2 justify-self-center mt-4">
            <Typography.H4 className={cn("text-lg text-right")}>Diterima Dari</Typography.H4>
            <Typography.P className={cn("text-muted-foreground")}>
              {" "}
              <div>
                <p>Andar Nugroho, SH. CIL.</p>
                <p>Nomor Rekening Advokat: 0300 612 652 A.n: Andar Nugroho Pada Bank: BCA</p>
              </div>
            </Typography.P>

            <Typography.H4 className={cn("text-lg text-right")}>Panjar Perkara</Typography.H4>
            <Typography.P className={cn("text-muted-foreground w-80")}>Rp. 2.221.000,00</Typography.P>

            <Typography.H4 className={cn("text-lg text-right")}>Status Pembayaran</Typography.H4>
            <Typography.P className={cn("text-muted-foreground w-80")}>Sudah dibayar</Typography.P>

            <Typography.H4 className={cn("text-lg text-right")}>Tanggal Pembayaran</Typography.H4>
            <Typography.P className={cn("text-muted-foreground w-80")}>Selasa, 05 Maret 2019</Typography.P>

            <Typography.H4 className={cn("text-lg text-right")}>Jam Pembayaran</Typography.H4>
            <Typography.P className={cn("text-muted-foreground w-80")}>08:00:59 WIB</Typography.P>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    )}