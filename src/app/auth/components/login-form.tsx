"use client";
import { useToast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const data = [
  {
    id: 1,
    nim: "2022",
    name: "krisna",
    email: "krisnabmntr@gmail.com",
    password: "123",
    role: "hakim",
    jabatan: "koordinator",
  },
  {
    id: 2,
    nim: "2023",
    name: "fatih",
    email: "fatih@gmail.com",
    password: "123",
    role: "juru sita",
    jabatan: "anggota",
  },
];

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nim = formData.get("nim");
    const pic = formData.get("pic");

    const user = await data.find((user) => user.nim === nim && user.password === pic);

    if (user) {
      router.push("/mahasiswa/dashboard");
    } else {
      // Handle errors
      toast({
        title: "Error Login",
        description: "NIM atau PIC anda salah",
        variant: "destructive",
      });
    }
  }

  // if (response.ok) {
  //   router.push('/mahasiswa/dashboard')
  // } else {
  //   // Handle errors
  // }

  return (
    <Card className="w-96 ">
      <CardHeader>
        <CardTitle>Login Sim-Court</CardTitle>
        <CardDescription>Masukkan Data Diri Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col  space-y-1.5">
              <Label htmlFor="nim">NIM</Label>
              <Input id="nim" name="nim" placeholder="Masukkan NIM anda" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pic">PIC</Label>
              <Input type="password" id="pic" name="pic" placeholder="Masukkan PIC Anda" />
            </div>
          </div>
          <Button className="w-full font-medium mt-4" size={"default"} type="submit">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full gap-2">
          {/* <Button variant={"outline"} className="w-full font-medium" size={"default"}>
            Buat Akun
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
}
