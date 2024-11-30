import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SignUpForm = () => {
  return (
    <Card className="w-96 ">
      <CardHeader>
        <CardTitle>Buat Akun Sim-Court</CardTitle>
        <CardDescription>Masukkan Data Diri Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col  space-y-1.5">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input id="nama" placeholder="Masukkan Nama Lengkap anda" />
            </div>
            <div className="flex flex-col  space-y-1.5">
              <Label htmlFor="nim">NIM</Label>
              <Input id="nim" placeholder="Masukkan NIM anda" />
            </div>
            {/* <Select>
              <Label htmlFor="kelas">Kelas</Label>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Kelas Hukum A" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Kelas Hukum A</SelectItem>
                <SelectItem value="B">Kelas Hukum B</SelectItem>
                <SelectItem value="C">Kelas Hukum C</SelectItem>
                <SelectItem value="D">Kelas Hukum D</SelectItem>
              </SelectContent>
            </Select> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pic">PIC</Label>
              <Input type="password" id="pic" placeholder="Masukkan PIC Anda" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-pic">Konfirmasi PIC</Label>
              <Input type="password" id="pic" placeholder="Ketik Ulang PIC anda" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full gap-2">
          <Button className="w-full font-medium" size={"default"}>
            Buat Akun
          </Button>
          {/* <Button variant={"outline"} className="w-full font-medium" size={"default"}>
            Sudah Punya Akun
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
