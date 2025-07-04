"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SignUpForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter();
  const { toast } = useToast();
  // State untuk form input
  const [formData, setFormData] = useState({
    nim: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "saksi", // Default role
  });

  // Handle perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validasi password & konfirmasi password
    if (formData.password !== formData.password_confirmation) {
      toast({ title: "Error", description: "Konfirmasi password tidak cocok", variant: "destructive" });
      return;
    }
    console.log("Form Data:", formData);
    try {
      const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
      console.log("URL Fetch:", `${NEXT_PUBLIC_URL_FETCH}/api/v1/auth/register`);
      const response = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      console.log("Response:", response);

      const result = await response.json();

      if (response.ok) {
        if (onSuccess) {
          onSuccess();
        }
        toast({ title: "Pendaftaran Berhasil", description: "Silakan login!", variant: "default" });
        // Redirect ke halaman login dan trigger tab login
      } else {
        if (result.errors && typeof result.errors === "object") {
          const messages: string[] = Object.values(result.errors).flat() as string[];

          toast({
            title: "Pendaftaran Gagal",
            description: (
              <ul className="list-disc pl-5 space-y-1">
                {messages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            ),
            variant: "destructive",
          });
        } else {
          // Jika error bukan validasi (misalnya server error 500)
          toast({
            title: "Pendaftaran Gagal",
            description: result.message || "Terjadi kesalahan",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({ title: "Error", description: String(error), variant: "destructive" });
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Buat Akun SimuCourt</CardTitle>
        <CardDescription>Masukkan Data Diri Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                placeholder="Masukkan Nama Lengkap Anda"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nim">NIM</Label>
              <Input
                id="nim"
                name="nim"
                type="number"
                placeholder="Masukkan NIM Anda"
                value={formData.nim}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan Email Anda"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan Password Anda"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
              <Input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="Ketik Ulang Password Anda"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>

            <Button className="w-full font-medium mt-4" size="default" type="submit">
              Buat Akun
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full gap-2">
          <Button variant="outline" className="w-full font-medium" size="default" onClick={() => router.push("/login")}>
            Sudah Punya Akun? Login
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
