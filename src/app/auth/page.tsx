"use client";

import Image from "next/image";
import LoginForm from "./components/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "./components/signup-form";
import BlurFade from "@/components/ui/blur-fade";
import { useState } from "react";

export default function Login() {
  const [tab, setTab] = useState("login");

  const handleSignupSuccess = () => {
    setTab("login");
  };
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row items-center justify-center gap-4">
      {/* Bagian kiri (disembunyikan di mobile) */}
      <div className="hidden md:flex w-1/2 justify-center items-center h-screen bg-[url(/mahkamah.jpg)] bg-center bg-cover relative">
        <div className="absolute w-full h-full bg-white bg-opacity-80 z-0"></div>
        <BlurFade>
          <Image
            src="/logo_simucourt.png"
            width={300}
            height={300}
            alt="Logo Laboratorium Hukum"
            className="md:w-[500px] md:h-[500px] z-10"
          />
        </BlurFade>
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row w-full md:w-1/2 h-screen  relative ">
        <Image
          src="/logo_simucourt.png"
          width={300}
          height={300}
          alt="Logo Laboratorium Hukum"
          className="md:w-[500px] md:h-[500px] z-10 md:block lg:hidden "
        />

        <div className="w-full md:w-1/2 px-4 md:px-0">
          <BlurFade delay={0.25}>
            <Tabs defaultValue="login" className="w-full max-w-[400px] mx-auto" value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Buat Akun</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm onSuccess={handleSignupSuccess} />
              </TabsContent>
            </Tabs>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
