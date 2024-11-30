"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/mahasiswa/dashboard"); // Replace '/dashboard' with your target route
  };
  return (
    <Card className="w-96 ">
      <CardHeader>
        <CardTitle>Login Sim-Court</CardTitle>
        <CardDescription>Masukkan Data Diri Anda</CardDescription>
        
      </CardHeader>
      <CardContent>
        <form action="">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col  space-y-1.5">
              <Label htmlFor="nim">NIM</Label>
              <Input  id="nim" placeholder="Masukkan NIM anda" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pic">PIC</Label>
              <Input type="password" id="pic" placeholder="Masukkan PIC Anda" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full gap-2">
          <Button className="w-full font-medium" size={"default"} onClick={handleLogin} >
            Login
          </Button>
          {/* <Button variant={"outline"} className="w-full font-medium" size={"default"}>
            Buat Akun
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
