import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image';

export default function Login() {
  return (
    <div className="h-screen w-screen flex  items-center justify-center bg-background">
       <Image
        src="/logo.png"
        width={500}
        height={500}
        alt="Logo Laboratorium Hukum"
      />
      <Card className="w-80 ">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Masukkan Data Diri Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col  space-y-1.5">
                <Label htmlFor="nim">NIM</Label>
                <Input className="" id="nim"  placeholder="Masukkan NIM anda"/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pic">PIC</Label>
                <Input id="pic" placeholder="Masukkan PIC Anda" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
         <Button className="w-full font-medium" size={"default"}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
