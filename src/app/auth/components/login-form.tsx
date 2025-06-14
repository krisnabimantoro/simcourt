"use client";
import { useToast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { delSession } from "@/lib/del-session";

export default function LoginForm() {
  // useEffect(() => {
  //   delSession(); // ✅ Call the Server Action inside useEffect()
  // }, []);

  const router = useRouter();
  const { toast } = useToast();
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nim = formData.get("nim");
    const password = formData.get("password");

    // const user = await data.find((user) => user.nim === nim && user.password === password);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nim, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({ title: "Login Berhasil", description: "Anda akan dialihkan ke dashboard.", variant: "default" });

        router.push(`/mahasiswa/dashboard`);
      } else {
        toast({ title: "Login gagal", description: data.message, variant: "destructive" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-96 ">
      <CardHeader>
        <CardTitle>Login SimuCourt</CardTitle>
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
              <Label htmlFor="password">Password</Label>
              <Input type="Password" id="password" name="password" placeholder="Masukkan password Anda" />
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
