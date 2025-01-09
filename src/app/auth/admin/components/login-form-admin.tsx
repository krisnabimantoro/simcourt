"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginComponent{
  tittleCard:string,
  
}

const LoginForm = ({tittleCard}:LoginComponent) => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/admin/dashboard"); // Replace '/dashboard' with your target route
  };
  return (
    <Card className="w-96 ">
      <CardHeader>
        <CardTitle>{tittleCard}</CardTitle>
        <CardDescription>Masukkan Data Diri Anda</CardDescription>
        
      </CardHeader>
      <CardContent>
        <form action="">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col  space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input  id="username" placeholder="Masukkan Username anda" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="pic" placeholder="Masukkan Password Anda" />
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
