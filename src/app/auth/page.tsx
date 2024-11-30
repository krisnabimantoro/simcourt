// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import Image from "next/image";
import LoginForm from "./components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "./components/signup-form";
import BlurFade from "@/components/ui/blur-fade";
// import DotPattern from "@/components/ui/dot-pattern";
// import { cn } from "@/lib/utils";

export default function Login() {
  return (
    <div className="h-screen w-screen flex  items-center justify-center bg-background gap-[80px]">
      <BlurFade>
        <Image src="/logo.png" width={210} height={210} alt="Logo Laboratorium Hukum" />
      </BlurFade>

      <BlurFade delay={0.25}>
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Buat Akun</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </BlurFade>
    
    </div>
  );
}